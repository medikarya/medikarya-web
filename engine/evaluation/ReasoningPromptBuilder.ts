// =========================
// engine/evaluation/ReasoningPromptBuilder.ts
// =========================
// Builds a compact, token-efficient prompt for the LLM.
// The LLM scores ONLY: reasoning quality, history, diagnosis, management.
// Testing is already handled deterministically by DeterministicScorer.

export class ReasoningPromptBuilder {
    /**
     * Builds the system prompt sent to the LLM.
     *
     * @param caseData    - Full case JSON
     * @param diagnosis   - Student's primary diagnosis string
     * @param summary     - Pre-computed summary of what the student did
     */
    static buildPrompt(
        caseData: any,
        diagnosis: string,
        summary: {
            /** Last N student messages from chat (keyword overview) */
            historyAsked: string[];
            /** Student's management plan (array of steps or free text) */
            management: string[];
            /** Intents of critical red flags the student never asked about */
            missedRedFlags: string[];
        }
    ): string {
        const evalConfig = caseData.evaluation_config;

        const requiredQs = evalConfig?.history?.required_questions?.join(", ") ?? "N/A";
        const importantQs = evalConfig?.history?.important_questions?.join(", ") ?? "N/A";
        const redFlags = evalConfig?.history?.red_flag_questions?.join(", ") ?? "N/A";
        const acceptedDx = evalConfig?.diagnosis?.accepted_primary?.join(", ") ?? caseData.patient?.final_diagnosis;
        const keywords = evalConfig?.diagnosis?.must_include_keywords?.join(", ") ?? "";
        const coreSteps = evalConfig?.management?.core_steps?.join(", ") ?? "N/A";
        const dangerSteps = evalConfig?.management?.dangerous_steps?.join(", ") ?? "N/A";

        const historyText = summary.historyAsked.length > 0
            ? summary.historyAsked.slice(-20).join(" | ")
            : "No history questions recorded";

        const mgmtText = summary.management.length > 0
            ? summary.management.join(", ")
            : "None provided";

        return `You are a senior clinical examiner evaluating a medical student's performance in a simulated case.

TASK: Score ONLY reasoning, history, diagnosis, and management quality.
DO NOT evaluate testing — that is already scored separately.

Return STRICTLY valid JSON (no markdown, no extra text):
{
  "reasoningScore": <number 0–30>,
  "historyScore": <number 0–25>,
  "diagnosisScore": <number 0–15>,
  "managementScore": <number 0–10>,
  "feedback": {
    "strengths": [<3–5 specific strings>],
    "improvements": [<3–5 specific strings>]
  }
}

SCORING GUIDE:
- reasoningScore (0–30): Overall clinical reasoning quality — did the student think systematically?
- historyScore (0–25):
    Required questions to cover: ${requiredQs}
    Important (bonus) questions: ${importantQs}
    Red-flag questions (must ask): ${redFlags}
- diagnosisScore (0–15):
    Accepted answers: ${acceptedDx}
    Must include keywords: ${keywords}
- managementScore (0–10):
    Core management steps expected: ${coreSteps}
    Dangerous/incorrect steps to penalise: ${dangerSteps}

CASE:
Title: ${caseData.title ?? "Unknown"}
Patient: ${caseData.patient?.name}, ${caseData.patient?.age}y, ${caseData.patient?.gender}
Chief Complaint: ${caseData.patient?.chiefComplaint}
Correct Diagnosis: ${caseData.patient?.final_diagnosis}

STUDENT PERFORMANCE:
Submitted Diagnosis: ${diagnosis}
History Questions Asked: ${historyText}
Management Plan: ${mgmtText}${summary.missedRedFlags.length > 0 ? `
Critical Red Flags Never Asked About: ${summary.missedRedFlags.map(f => f.replace(/_/g, " ")).join(", ")} — MUST mention in improvements.` : ""}`.trim();
    }
}
