
const cases = [
    // Should PASS guard (Greetings -> LLM or logic)
    // Since we don't have LLM running, we expect it NOT to be "I don't know" from the guard.
    // Ideally, it might fail later or return something else, but "isLikelyDoctorQuestion" should return true.
    { q: "hi", expectedGuardBlock: false },
    { q: "hello", expectedGuardBlock: false },
    { q: "good morning", expectedGuardBlock: false },

    // Should BLOCK (Non-questions)
    { q: "vomiting", expectedGuardBlock: true },
    { q: "he is sick", expectedGuardBlock: true },
];

async function runTests() {
    const url = `http://localhost:3000/api/chat/patient`;
    const mockCaseData = {
        patient_text_brief: "Background info...",
        patient_facts: { vomiting: { present: true, duration_days: 2, projectile: false, bilious: false, blood: false } }
    };

    console.log("Starting Greeting Guard Validation...");
    let passed = 0;

    for (const test of cases) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: test.q,
                    caseData: mockCaseData
                })
            });

            const data = await response.json();

            // If blocked by guard, source is "guard" and response is "I don't know."
            const isBlocked = data.source === "guard" && data.response === "I don't know.";

            if (test.expectedGuardBlock === isBlocked) {
                console.log(`[PASS] "${test.q}" -> Blocked: ${isBlocked}`);
                passed++;
            } else {
                console.log(`[FAIL] "${test.q}" -> Expected Blocked: ${test.expectedGuardBlock}, Got: ${isBlocked} (Source: ${data.source})`);
            }
        } catch (e) {
            console.error(`[ERROR] "${test.q}" ->`, e.message);
        }
    }
    console.log(`\nTests Completed: ${passed}/${cases.length} Passed`);
}

runTests();
