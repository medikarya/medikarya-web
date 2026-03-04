"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function getDashboardStats() {
    try {
        // Always derive userId from the server-side session — never from client input
        const { userId } = await auth();
        if (!userId) {
            return {
                totalXP: 0,
                casesSolved: 0,
                streakDays: 0,
                recentCases: []
            };
        }

        // Run all three DB queries in parallel for faster dashboard loads
        const [attemptsResult, profileResult, casesResult] = await Promise.all([
            supabaseServer
                .from("case_attempts")
                .select("id, case_id, score, xp_earned, time_taken, created_at")
                .eq("user_id", userId)
                .order("created_at", { ascending: false }),

            supabaseServer
                .from("user_profiles")
                .select("current_streak")
                .eq("clerk_user_id", userId)
                .maybeSingle(),

            supabaseServer
                .from("cases")
                .select("id, title"),
        ]);

        if (attemptsResult.error) {
            console.error("Error fetching dashboard stats:", attemptsResult.error);
            throw new Error("Failed to fetch dashboard stats");
        }
        if (profileResult.error) {
            console.error("Error fetching user profile for streak:", profileResult.error);
        }

        const attempts = attemptsResult.data ?? [];
        const profile = profileResult.data;
        const casesData = casesResult.data ?? [];

        // Build case title lookup map
        const caseMap = new Map<string, string>();
        casesData.forEach(c => caseMap.set(c.id, c.title));

        const stats = {
            totalXP: 0,
            casesSolved: 0,
            streakDays: profile?.current_streak || 0,
            recentCases: [] as any[]
        };

        if (attempts.length === 0) {
            return stats;
        }

        // Tally XP and unique cases solved
        const uniqueCases = new Set<string>();
        for (const attempt of attempts) {
            stats.totalXP += attempt.xp_earned || 0;
            uniqueCases.add(attempt.case_id);
        }
        stats.casesSolved = uniqueCases.size;

        // Format recent 5 cases
        stats.recentCases = attempts.slice(0, 5).map(attempt => {
            const minutes = Math.floor((attempt.time_taken || 0) / 60);
            const seconds = (attempt.time_taken || 0) % 60;
            const timeTakenStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
            return {
                id: attempt.id,
                title: caseMap.get(attempt.case_id) || attempt.case_id,
                score: attempt.score || 0,
                xpEarned: attempt.xp_earned || 0,
                timeTaken: timeTakenStr,
            };
        });

        return stats;
    } catch (err) {
        console.error("Dashboard stats action failed:", err);
        return { totalXP: 0, casesSolved: 0, streakDays: 0, recentCases: [] };
    }
}
