// =========================
// cases/lib/red-flag-detector.ts
// =========================
// Reads evaluation_config.red_flags from caseData — no hardcoded keywords.
// Replaces all redFlags.rules.ts files.
//
// Three purposes (A/B/C) are exported separately so callers are explicit:
//
//   A. Simulation  — hasRedFlagPresent(caseData)
//   B. Evaluation  — getUncheckedCriticalFlags(chatHistory, caseData)
//   C. Test class  — isTestJustifiedByRedFlag(testId, caseData, chatHistory)

// ── Type re-exported for callers ─────────────────────────────────────────────
export interface RedFlag {
    intent: string;            // e.g. "chest_pain", "syncope"
    keywords: string[];        // trigger words detected in student messages
    present_in_case: boolean;  // true → patient ACTUALLY has this symptom
    critical: boolean;         // true → flag is high-stakes
    // Penalty fires ONLY when both critical && present_in_case are true and student never asked.
    // If present_in_case === false: no penalty (student can't be punished for not finding absent symptoms)
    justifies_tests?: string[];  // test IDs that become justified if student raised this flag
}

// ── Helper: extract red_flags array from caseData safely ─────────────────────
function getRedFlags(caseData: any): RedFlag[] {
    return caseData?.evaluation_config?.red_flags ?? [];
}

// ── Helper: detect if a single message matches a red flag ────────────────────
function messageMatchesFlag(message: string, flag: RedFlag): boolean {
    const lower = message.toLowerCase();
    // Match by intent slug (e.g. "chest_pain" → "chest pain") + keywords
    const intentWords = flag.intent.replace(/_/g, " ");
    return (
        lower.includes(intentWords) ||
        flag.keywords.some((kw) => lower.includes(kw.toLowerCase()))
    );
}

// ── A. Simulation: does the case have any active red flag symptoms? ───────────
// If true, the AI patient should respond with urgency cues.
export function hasRedFlagPresent(caseData: any): boolean {
    return getRedFlags(caseData).some((f) => f.present_in_case);
}

// ── B. Evaluation: which critical flags did the student NEVER ask about? ──────
// Penalty applies ONLY when:
//   critical === true   → this flag is high-stakes
//   present_in_case === true → patient ACTUALLY has this symptom
//   student never asked → missed screening opportunity
// If present_in_case === false, no penalty regardless — medicine is probabilistic.
export function getUncheckedCriticalFlags(
    chatHistory: { role: string; content: string }[],
    caseData: any
): string[] {
    const flags = getRedFlags(caseData).filter(
        (f) => f.critical && f.present_in_case  // ← both required
    );
    const studentMessages = chatHistory.filter((m) => m.role === "user");

    return flags
        .filter((flag) =>
            !studentMessages.some((msg) =>
                messageMatchesFlag(String(msg.content ?? ""), flag)
            )
        )
        .map((f) => f.intent);
}

// ── Convenience: did the student ask about at least ONE red flag? ─────────────
export function studentAskedAboutRedFlag(
    chatHistory: { role: string; content: string }[],
    caseData: any
): boolean {
    const flags = getRedFlags(caseData);
    const studentMessages = chatHistory.filter((m) => m.role === "user");

    return flags.some((flag) =>
        studentMessages.some((msg) =>
            messageMatchesFlag(String(msg.content ?? ""), flag)
        )
    );
}

// ── C. Test justification: is a test ID justified by a red flag being raised? ─
// Example: in migraine, MRI is distractor unless student asked about focal neurology.
// If a red flag has justifies_tests: ["mri"] and student asked about it → MRI is justified.
export function isTestJustifiedByRedFlag(
    testId: string,
    caseData: any,
    chatHistory: { role: string; content: string }[]
): boolean {
    const flags = getRedFlags(caseData);
    const studentMessages = chatHistory.filter((m) => m.role === "user");

    return flags.some(
        (flag) =>
            flag.justifies_tests?.includes(testId) &&
            studentMessages.some((msg) =>
                messageMatchesFlag(String(msg.content ?? ""), flag)
            )
    );
}
