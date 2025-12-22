
const cases = [
    // Should trigger guard ("I don't know")
    { q: "hello", expected: "I don't know." },
    { q: "good morning", expected: "I don't know." },
    { q: "vomiting", expected: "I don't know." },

    // Should pass through to guard/AI (Question format)
    { q: "is he vomiting?", expected: "Yes." },
];

async function runTests() {
    const url = `http://localhost:3000/api/chat/patient`;

    const mockCaseData = {
        patient_text_brief: "Background info...",
        patient_facts: {
            vomiting: { present: true, duration_days: 2, projectile: false, bilious: false, blood: false },
            diarrhea: { present: true, duration_days: 1, frequency_per_day: 3, bloody: false, appearance: "Watery" },
            fever: { present: true },
            abdominal_pain: { present: true },
            identity: { name: "Rohan", age_years: 2, gender: "boy", role: "mother" },
            general: { poor_appetite: true },
            lifestyle: { diet: "Solids" },
            past_history: { allergies: false, regular_medications: false, immunization_complete: true }
        }
    };

    console.log("Starting Non-Question Guard Validation...");

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

            if (!data.response) {
                console.error(`[FAIL] "${test.q}" -> No 'response' field. Data received:`, JSON.stringify(data));
                continue;
            }

            const actual = data.response;
            const isMatch = actual.includes(test.expected) || actual === test.expected;

            if (isMatch) {
                console.log(`[PASS] "${test.q}" -> "${actual}"`);
            } else {
                console.log(`[FAIL] "${test.q}" -> Expected "${test.expected}", got "${actual}" (Source: ${data.source})`);
            }
        } catch (e) {
            console.error(`[ERROR] "${test.q}" ->`, e);
        }
    }
}

runTests();
