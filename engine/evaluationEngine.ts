import { Groq } from "groq-sdk";

export interface EvaluationResult {
    correctDiagnosis: string;
    studentDiagnosis: string;
    isCorrect: boolean;
    score: number;
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

export class EvaluationEngine {
    static async evaluate(
        diagnosis: any,
        orderedTests: any[],
        chatHistory: any[],
        caseData: any
    ): Promise<EvaluationResult> {
        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            throw new Error("Missing GROQ_API_KEY");
        }

        const groq = new Groq({ apiKey });

        // optimize prompt size by filtering chat history
        const relevantChat = chatHistory
            .map(m => `${m.role === 'user' ? 'Student' : 'Patient'}: ${m.content}`)
            .join("\n");

        const orderedTestNames = orderedTests.map(t => t.name).join(", ");

        const systemPrompt = `
You are a senior medical school examiner. Evaluate the student's performance in this clinical case simulation.
Return the output strictly as a JSON object with the following schema:
{
  "score": number (0-100),
  "isCorrect": boolean,
  "feedback": {
    "strengths": string[] (3-5 specific bullet points),
    "improvements": string[] (3-5 specific bullet points),
    "testingEfficiency": {
      "appropriateTests": number,
      "unnecessaryTests": number,
      "missedTests": string[]
    }
  }
}

SCORING CRITERIA:
- History Taking (40%): Did they ask about duration, severity, red flags (blood, weight loss)?
- Testing (20%): Did they order relevant tests? Did they avoid expensive/radiation-heavy tests if unnecessary?
- Diagnosis (40%): Is the primary diagnosis correct?

CASE DATA:
Patient: ${caseData.patient.name}, ${caseData.patient.age}y
Chief Complaint: ${caseData.patient.chiefComplaint}
Correct Diagnosis: ${caseData.patient.final_diagnosis}
Facts: ${JSON.stringify(caseData.patient_facts)}
Allowed/Relevant Tests: ${caseData.patient.investigations.allowed_tests.join(", ")}

STUDENT PERFORMANCE:
Diagnosis Submitted: ${diagnosis.primaryDiagnosis}
Tests Ordered: ${orderedTestNames || "None"}

TRANSCRIPT:
${relevantChat}
`.trim();

        try {
            const completion = await groq.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: "Evaluate this student's performance." }
                ],
                model: "llama-3.3-70b-versatile",
                temperature: 0.1,
                response_format: { type: "json_object" }
            });

            const content = completion.choices[0]?.message?.content;
            if (!content) throw new Error("Empty response from AI");

            const result = JSON.parse(content);

            return {
                correctDiagnosis: caseData.patient.final_diagnosis,
                studentDiagnosis: diagnosis.primaryDiagnosis,
                isCorrect: result.isCorrect,
                score: result.score,
                feedback: result.feedback
            };

        } catch (error) {
            console.error("AI Evaluation Failed:", error);
            // Fallback to basic result
            return {
                correctDiagnosis: caseData.patient.final_diagnosis,
                studentDiagnosis: diagnosis.primaryDiagnosis,
                isCorrect: false,
                score: 0,
                feedback: {
                    strengths: ["Evaluation failed - please try again"],
                    improvements: ["System error"],
                    testingEfficiency: { appropriateTests: 0, unnecessaryTests: 0, missedTests: [] }
                }
            };
        }
    }
}
