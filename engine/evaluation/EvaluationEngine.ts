// =========================
// engine/evaluation/EvaluationEngine.ts
// =========================
// Orchestrates: DeterministicScorer → ReasoningPromptBuilder → LLM → merge

import { Groq } from "groq-sdk";
import { DeterministicScorer } from "./DeterministicScorer";
import { ReasoningPromptBuilder } from "./ReasoningPromptBuilder";
import { FinalEvaluationResult, LLMReasoningResult } from "./types";
import { getUncheckedCriticalFlags } from "../../cases/lib/red-flag-detector";

export class EvaluationEngine {
    static async evaluate(
        diagnosis: any,
        orderedTests: any[],
        chatHistory: any[],
        caseData: any
    ): Promise<FinalEvaluationResult> {
        console.log("EvaluationEngine: Starting evaluation for:", caseData.patient?.name);

        const orderedTestItems: { id: string; name: string }[] = orderedTests.map((t) => ({
            id: String(t.id ?? t.name ?? ""),
            name: String(t.name ?? ""),
        }));

        // ── 1. Deterministic testing score ───────────────────────────────────────
        const evalConfig = caseData.evaluation_config;

        let deterministic;
        if (evalConfig?.testing) {
            deterministic = DeterministicScorer.scoreTesting(orderedTestItems, evalConfig);
            console.log(
                `EvaluationEngine: testingScore=${deterministic.testingScore}, ` +
                `safetyPenalty=${deterministic.safetyPenalty}`
            );
        } else {
            // Fallback if case has no evaluation_config
            console.warn("EvaluationEngine: No evaluation_config.testing found — skipping deterministic scoring");
            deterministic = {
                testingScore: 10,
                safetyPenalty: 0,
                breakdown: {
                    coreMatched: 0,
                    optionalMatched: 0,
                    distractorMatched: 0,
                    dangerousMatched: 0,
                    missedCore: [],
                },
            };
        }

        // ── 2. Red flag penalty ───────────────────────────────────────────────────
        const missedRedFlags = getUncheckedCriticalFlags(chatHistory, caseData);
        const redFlagPenalty = missedRedFlags.length * 5; // 5 pts per missed critical flag

        if (missedRedFlags.length > 0) {
            console.warn(
                `EvaluationEngine: missed critical red flags=${missedRedFlags.join(", ")}, ` +
                `redFlagPenalty=${redFlagPenalty}`
            );
        }

        // ── 2. Build summary for LLM ─────────────────────────────────────────────
        const historyAsked = chatHistory
            .filter((m) => m.role === "user")
            .map((m) => String(m.content ?? "").slice(0, 200)); // cap each message

        const management: string[] = Array.isArray(diagnosis.managementPlan)
            ? diagnosis.managementPlan
            : diagnosis.managementPlan
                ? [String(diagnosis.managementPlan)]
                : [];

        const systemPrompt = ReasoningPromptBuilder.buildPrompt(
            caseData,
            diagnosis.primaryDiagnosis ?? "Not provided",
            { historyAsked, management, missedRedFlags }
        );

        // ── 3. LLM call ───────────────────────────────────────────────────────────
        let llmResult: LLMReasoningResult;

        try {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) throw new Error("Missing GROQ_API_KEY");

            const groq = new Groq({ apiKey });

            console.log("EvaluationEngine: Calling LLM for qualitative scoring...");
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: "Evaluate this student's performance." },
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.1,
                response_format: { type: "json_object" },
            });

            const content = completion.choices[0]?.message?.content;
            if (!content) throw new Error("Empty LLM response");

            const parsed = JSON.parse(content) as any;

            // Safe assignment with boundary clamping to prevent NaN crashes
            llmResult = {
                reasoningScore: Math.min(30, Math.max(0, Number(parsed.reasoningScore) || 0)),
                historyScore: Math.min(25, Math.max(0, Number(parsed.historyScore) || 0)),
                diagnosisScore: Math.min(15, Math.max(0, Number(parsed.diagnosisScore) || 0)),
                managementScore: Math.min(10, Math.max(0, Number(parsed.managementScore) || 0)),
                feedback: {
                    strengths: Array.isArray(parsed.feedback?.strengths) ? parsed.feedback.strengths : ["Good effort evaluating the case."],
                    improvements: Array.isArray(parsed.feedback?.improvements) ? parsed.feedback.improvements : ["Review the case discussion for key takeaways."]
                }
            };

            console.log(
                `EvaluationEngine: LLM scores (sanitised) — reasoning=${llmResult.reasoningScore}, ` +
                `history=${llmResult.historyScore}, diagnosis=${llmResult.diagnosisScore}, ` +
                `management=${llmResult.managementScore}`
            );
        } catch (err: any) {
            console.error("EvaluationEngine: LLM call failed, using fallback scores:", err.message);
            // Graceful fallback — deterministic score still used
            llmResult = {
                reasoningScore: 10,
                historyScore: 5,
                diagnosisScore: 5,
                managementScore: 0,
                feedback: {
                    strengths: ["Evaluation could not be fully completed due to a connection error."],
                    improvements: ["Ensure a stable connection for complete AI evaluation of your reasoning."]
                },
            };
        }

        // ── 4. Merge scores ───────────────────────────────────────────────────────
        const baseScore =
            deterministic.testingScore +
            llmResult.reasoningScore +
            llmResult.historyScore +
            llmResult.diagnosisScore +
            llmResult.managementScore;

        const totalPenalty = deterministic.safetyPenalty + redFlagPenalty;
        const finalScore = Math.max(0, Math.min(100, baseScore - totalPenalty));

        console.log(
            `EvaluationEngine: base=${baseScore}, testPenalty=${deterministic.safetyPenalty}, ` +
            `redFlagPenalty=${redFlagPenalty}, final=${finalScore}`
        );

        // ── 5. Determine isCorrect ────────────────────────────────────────────────
        const studentDx = diagnosis.primaryDiagnosis ?? "";
        const acceptedDx: string[] = evalConfig?.diagnosis?.accepted_primary ?? [];
        const keywords: string[] = evalConfig?.diagnosis?.must_include_keywords ?? [];

        const normalise = (s: string) => s.toLowerCase().trim();
        const isExactMatch = acceptedDx.some(
            (dx) => normalise(dx) === normalise(studentDx)
        );
        const isKeywordMatch =
            keywords.length > 0 &&
            keywords.every((kw) => normalise(studentDx).includes(normalise(kw)));

        const isCorrect = isExactMatch || isKeywordMatch;

        // ── 6. Build UI-compatible testingEfficiency ──────────────────────────────
        const bd = deterministic.breakdown;
        const appropriateTests = bd.coreMatched + bd.optionalMatched;
        const unnecessaryTests = bd.distractorMatched + bd.dangerousMatched;

        return {
            // top-level UI fields
            score: finalScore,
            finalScore,
            isCorrect,
            studentDiagnosis: studentDx,
            correctDiagnosis: caseData.patient?.final_diagnosis ?? "",

            // per-domain
            testingScore: deterministic.testingScore,
            reasoningScore: llmResult.reasoningScore,
            historyScore: llmResult.historyScore,
            diagnosisScore: llmResult.diagnosisScore,
            managementScore: llmResult.managementScore,
            safetyPenalty: totalPenalty,
            missedRedFlags,

            // feedback
            feedback: {
                strengths: llmResult.feedback.strengths,
                improvements: llmResult.feedback.improvements,
                testingEfficiency: {
                    appropriateTests,
                    unnecessaryTests,
                    missedTests: bd.missedCore,
                },
            },
        };
    }
}
