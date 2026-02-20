// =========================
// engine/evaluation/DeterministicScorer.ts
// =========================
// Pure, deterministic scoring — no AI, fully testable.
// Scores the TESTING domain only (0–20 pts).
// LLM handles history, reasoning, diagnosis, management.

import { DeterministicResult, EvaluationConfig } from "./types";

export class DeterministicScorer {
    /**
     * Score the student's test ordering against evaluation_config.testing.
     * Matches by test ID (exact, from a Set) — no fuzzy logic.
     *
     * Scoring breakdown (max 20):
     *   +8  per core test ordered
     *   −5  per core test missed
     *   +3  per optional test ordered
     *   −4  per distractor test ordered
     *   −10 per dangerous test ordered  (also added to safetyPenalty)
     *
     * evaluation_config.testing lists IDs (e.g. "cbc", "ctpa")
     * If testing_required === false and student ordered nothing → full 20 pts.
     * Final testingScore is clamped to [0, 20].
     */
    static scoreTesting(
        orderedTests: { id: string; name: string }[],
        evaluationConfig: EvaluationConfig
    ): DeterministicResult {
        const cfg = evaluationConfig.testing;

        const core = cfg.core_tests ?? [];
        const optional = cfg.optional_tests ?? [];
        const distractor = cfg.distractor_tests ?? [];
        const dangerous = cfg.dangerous_tests ?? [];

        // If testing not required, reward clinician restraint
        if (!cfg.testing_required) {
            if (orderedTests.length === 0) {
                return {
                    testingScore: 20,
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
            // Penalise ordering tests when not needed
            return {
                testingScore: Math.max(0, 20 - orderedTests.length * 3),
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

        // Exact ID lookup — no fuzzy, no collisions
        const orderedIds = new Set(orderedTests.map((t) => t.id));

        let score = 0;
        let safetyPenalty = 0;

        let coreMatched = 0;
        let optionalMatched = 0;
        let distractorMatched = 0;
        let dangerousMatched = 0;
        const missedCore: string[] = [];

        // ── Core tests ──────────────────────────────────────────────────────────
        for (const id of core) {
            if (orderedIds.has(id)) {
                score += 8;
                coreMatched++;
            } else {
                score -= 5;
                missedCore.push(id);
            }
        }

        // ── Optional tests ───────────────────────────────────────────────────────
        for (const id of optional) {
            if (orderedIds.has(id)) {
                score += 3;
                optionalMatched++;
            }
        }

        // ── Distractor tests (unnecessary but not clinically dangerous) ──────────
        for (const id of distractor) {
            if (orderedIds.has(id)) {
                score -= 4;
                distractorMatched++;
            }
        }

        // ── Dangerous tests (radiation / clearly inappropriate) ──────────────────
        for (const id of dangerous) {
            if (orderedIds.has(id)) {
                score -= 10;
                safetyPenalty += 10;
                dangerousMatched++;
            }
        }

        console.log(
            `DeterministicScorer: core=${coreMatched}/${core.length}, optional=${optionalMatched}, ` +
            `distractor=${distractorMatched}, dangerous=${dangerousMatched}, rawScore=${score}`
        );

        return {
            testingScore: Math.max(0, Math.min(20, score)),
            safetyPenalty,
            breakdown: {
                coreMatched,
                optionalMatched,
                distractorMatched,
                dangerousMatched,
                missedCore,
            },
        };
    }
}
