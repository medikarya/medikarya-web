"use server";

import { supabaseServer } from "@/lib/supabase/server";
import { getCases } from "@/data/cases";

export async function getDashboardStats(userId: string) {
    try {
        if (!userId) {
            return {
                totalXP: 0,
                casesSolved: 0,
                streakDays: 0,
                recentCases: [],
                _debug: null
            };
        }

        // Fetch all attempts for the user
        const { data: attempts, error } = await supabaseServer
            .from("case_attempts")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching dashboard stats from Supabase:", error);
            throw new Error("Failed to fetch dashboard stats");
        }

        // Fetch streak data from user_profiles table safely
        const { data: profile, error: profileError } = await supabaseServer
            .from("user_profiles")
            .select("current_streak")
            .eq("clerk_user_id", userId)
            .maybeSingle();

        if (profileError) {
            console.error("Error fetching user profile for streak:", profileError);
        }

        const stats = {
            totalXP: 0,
            casesSolved: 0,
            streakDays: profile?.current_streak || 0,
            recentCases: [] as any[],
            _debug: {
                userId,
                profileData: profile,
                attemptsCount: attempts?.length || 0,
                errorFromAttempts: error ? (error as any).message : null,
                errorFromProfile: profileError ? (profileError as any).message : null
            }
        };

        if (!attempts || attempts.length === 0) {
            return stats;
        }

        // Calculate Total XP and unique Cases Solved
        const uniqueCases = new Set();
        for (const attempt of attempts) {
            stats.totalXP += attempt.xp_earned || 0;
            // A case is usually considered "solved" if they passed or just attempted, we'll count unique attempted cases
            uniqueCases.add(attempt.case_id);
        }
        stats.casesSolved = uniqueCases.size;

        // Fetch metadata to map case_id to case title
        const allLocalCases = await getCases();
        const caseMap = new Map();
        allLocalCases.forEach(c => caseMap.set(c.id, c.title));

        // Format recent cases (up to 5)
        const recentAttempts = attempts.slice(0, 5);
        stats.recentCases = recentAttempts.map(attempt => {
            // Format time taken from seconds to mm:ss
            const minutes = Math.floor((attempt.time_taken || 0) / 60);
            const seconds = (attempt.time_taken || 0) % 60;
            const timeTakenStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

            return {
                id: attempt.id,
                title: caseMap.get(attempt.case_id) || attempt.case_id,
                score: attempt.score || 0,
                xpEarned: attempt.xp_earned || 0,
                timeTaken: timeTakenStr
            };
        });

        return stats;
    } catch (err) {
        console.error("Dashboard stats action failed:", err);
        return {
            totalXP: 0,
            casesSolved: 0,
            streakDays: 0,
            recentCases: [],
            _debug: {
                error: (err as any)?.message || String(err),
                where: "catch_block"
            }
        };
    }
}
