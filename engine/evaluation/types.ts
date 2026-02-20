// =========================
// engine/evaluation/types.ts
// =========================

// ── Raw evaluation_config shape from case JSON ──────────────────────────────

export interface EvaluationConfigHistory {
    required_questions: string[];
    important_questions: string[];
    red_flag_questions: string[];
}

export interface EvaluationConfigTesting {
    testing_required: boolean;
    core_tests: string[];
    optional_tests: string[];
    distractor_tests: string[];
    dangerous_tests: string[];
}

export interface EvaluationConfigDiagnosis {
    accepted_primary: string[];
    must_include_keywords: string[];
}

export interface RedFlag {
    intent: string;
    keywords: string[];
    present_in_case: boolean;
    critical: boolean;
    justifies_tests?: string[];
}

export interface EvaluationConfigManagement {
    core_steps: string[];
    dangerous_steps: string[];
}

export interface EvaluationConfig {
    history: EvaluationConfigHistory;
    testing: EvaluationConfigTesting;
    diagnosis: EvaluationConfigDiagnosis;
    management: EvaluationConfigManagement;
    red_flags: RedFlag[];
}

// ── Deterministic scorer output ──────────────────────────────────────────────

export interface TestingBreakdown {
    coreMatched: number;
    optionalMatched: number;
    distractorMatched: number;
    dangerousMatched: number;
    missedCore: string[];
}

export interface DeterministicResult {
    testingScore: number;   // 0–20
    safetyPenalty: number;  // subtracted from final score
    breakdown: TestingBreakdown;
}

// ── LLM reasoning output ─────────────────────────────────────────────────────

export interface LLMReasoningResult {
    reasoningScore: number;   // 0–30
    historyScore: number;     // 0–25
    diagnosisScore: number;   // 0–15
    managementScore: number;  // 0–10
    feedback: {
        strengths: string[];
        improvements: string[];
    };
}

// ── Final result returned to the UI ──────────────────────────────────────────
// Must remain compatible with what case-feedback.tsx reads:
//   feedback.score, feedback.isCorrect, feedback.studentDiagnosis,
//   feedback.correctDiagnosis, feedback.feedback.{ strengths, improvements,
//   testingEfficiency.{ appropriateTests, unnecessaryTests, missedTests } }

export interface FinalEvaluationResult {
    // top-level compat fields
    score: number;                // alias for finalScore (0–100)
    finalScore: number;
    isCorrect: boolean;
    studentDiagnosis: string;
    correctDiagnosis: string;

    // per-domain breakdown (shown in UI future)
    testingScore: number;
    reasoningScore: number;
    historyScore: number;
    diagnosisScore: number;
    managementScore: number;
    safetyPenalty: number;     // total penalty (test + red flags)
    missedRedFlags: string[];   // intents of critical flags the student never asked about

    // feedback shape expected by CaseFeedback
    feedback: {
        strengths: string[];
        improvements: string[];
        testingEfficiency: {
            appropriateTests: number;
            unnecessaryTests: number;
            missedTests: string[];
        };
    };
}
