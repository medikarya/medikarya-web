
const cases = [
    // Should trigger guard ("I don't know")
    { q: "hello", expected: "I don't know." },
    { q: "good morning", expected: "I don't know." },
    { q: "vomiting", expected: "I don't know." },
    { q: "he is sick", expected: "I don't know." },

    // Should pass through to guard/AI (Question format)
    { q: "is he vomiting?", expected: "Yes." }, // Assuming facts exist
    { q: "how is he?", expected: "He is vomiting." }, // Descriptive trigger
    { q: "does he have fever?", expected: "Yes." }, // Assuming fever fact
    { q: "what is his name?", expected: "Rohan" }, // Identity
];

async function runTests() {
    const caseId = "viral-gastroenteritis";
    const url = `http://localhost:3000/api/chat/patient`;

    // We need to fetch case data first to simulate the real payload
    // In a real integration test we'd mock this, but here we'll just constructing a minimal payload
    // or fetching the real case data if we could. 
    // Since we can't easily fetch and pass caseData here without a complex setup, 
    // we will rely on manual verification or assume the logic works if the unit test logic matches.

    // BUT, to actually test the endpoint, we need valid caseData.
    // We can try to fetch the case data from the file system or just mock it enough to pass validation. 

    const mockCaseData = {
        patient_text_brief: "Background info...",
        patient_facts: {
            vomiting: { present: true, duration_days: 2, projectile: false, bilious: false, blood: false },
            diarrhea: { present: true },
            fever: { present: true },
            abdominal_pain: { present: true },
            identity: { name: "Rohan", age_years: 2, gender: "boy" }
        }
    };

    console.log("Starting Non-Question Guard Validation...");
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
            const actual = data.response;

            // Flexible matching for "Rohan" vs "Rohan."
            const isMatch = actual.includes(test.expected) || actual === test.expected;

            if (isMatch) {
                console.log(`[PASS] "${test.q}" -> "${actual}"`);
                passed++;
            } else {
                console.log(`[FAIL] "${test.q}" -> Expected "${test.expected}", got "${actual}" (Source: ${data.source})`);
            }
        } catch (e) {
            console.error(`[ERROR] "${test.q}" ->`, e.message);
        }
    }

    console.log(`\nTests Completed: ${passed}/${cases.length} Passed`);
}

runTests();
