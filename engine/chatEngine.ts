
import { CaseData } from '../data/cases/index';
import { getCaseModule } from '../cases/registry';
import { CaseResponse } from '../cases/types';
import { GoogleGenerativeAI } from "@google/generative-ai";

export class ChatEngine {

    static async processRequest(
        message: string,
        caseData: CaseData,
        userId: string
    ): Promise<CaseResponse | { error: string, status: number }> {

        // 1. Validation (matches route.ts)
        if (!message || (!caseData?.patient_text_brief && !caseData?.patient_facts)) {
            return { error: "Missing message or patient data", status: 400 };
        }

        const lowerQ = message.toLowerCase().trim();

        // 2. Generic Guard: Is this a question for the doctor?
        if (!this.isLikelyDoctorQuestion(lowerQ)) {
            return {
                response: "I don't know.",
                timestamp: new Date().toISOString(),
                source: "guard"
            };
        }

        // 3. Case Module Delegation
        const caseId = caseData.id;
        const module = getCaseModule(caseId);

        // If module is found and we have facts, try generic guard logic
        if (module && caseData.patient_facts) {
            const guardResponse = module.handleFactQuestion(message, caseData.patient_facts);
            if (guardResponse) {
                return guardResponse; // Return strict guard response
            }

            // Also check Red Flag silently (requirement: silent detection)
            // const isRedFlag = module.detectRedFlag(message);
        }

        // 4. LLM Fallback (Gemini)
        return await this.generateLLMResponse(message, caseData);
    }

    // Helper from route.ts
    private static isLikelyDoctorQuestion(q: string) {
        if (q.includes("?")) return true;

        const keywords = ["hi", "hello", "greetings", "good morning", "good afternoon", "good evening", "hey"];
        if (keywords.some(k => q.includes(k))) return true;

        const questionStarters = [
            "is ", "are ", "was ", "were ",
            "how ", "what ", "when ", "where ", "why ", "who ", "which ", "whom ",
            "does ", "do ", "did ", "can ", "could ",
            "has ", "have ",
            "what's", "where's", "how's", "who's",
            "tell me", "describe"
        ];

        return questionStarters.some(starter => q.startsWith(starter));
    }

    private static async generateLLMResponse(message: string, caseData: CaseData): Promise<CaseResponse | { error: string, status: number }> {
        // Dynamic Prompt Construction
        const patientName = caseData.patient_facts?.identity?.name || "the patient";
        const patientAge = caseData.patient_facts?.identity?.age_years ?
            `${caseData.patient_facts.identity.age_years} years old` :
            (caseData.patient_facts?.identity?.age_weeks + " weeks old");

        const role = caseData.patient?.ai_personality?.role || "Mother of the patient";
        const communicationStyle = caseData.patient?.ai_personality?.communication_style || "Calm but concerned.";
        const tone = caseData.patient?.ai_personality?.tone || "Worried.";

        const systemPrompt = `
You are the ${role} of a ${patientAge} named ${patientName}.
You are speaking directly to a doctor in a consultation.

YOUR GOAL: To get help for your child. You are worried.

STRICT SPEAKING RULES (Follow these exactly):
1.  **KEEP IT SHORT**: Use 1-2 short sentences maximum. No long paragraphs.
2.  **LAYMAN LANGUAGE**: You are NOT a doctor. You do NOT know medical terms.
    -   NEVER say "jaundice" -> Say "yellow skin" or "yellow eyes".
    -   NEVER say "lethargic" -> Say "he is tired" or "sleepy".
    -   NEVER say "stools" -> Say "poop".
3.  **DIRECT ANSWERS**: If asked a Yes/No question, start with "Yes" or "No".
4.  **STAY IN CHARACTER**: You are ${communicationStyle}. You are ${tone}.
5.  **DON'T KNOW?**: If the answer isn't in the background info below, say "I don't know" or "No". Do not guess.

BACKGROUND INFORMATION (This is your only memory):
${caseData.patient_text_brief}

INSTRUCTIONS FOR HANDLING QUESTIONS:
-   If asked "What is the problem?", describe the "MAIN PROBLEM" from the background in your own words.
-   If asked about feeding/poop/pee, use the info in "OTHER SYMPTOMS".
-   If asked about pregnancy/birth, use "HISTORY".
-   If asked "Who are you?", say "I am his mother."

Remember: Be brief, be simple, be worried.
`.trim();

        try {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
                console.error("Missing GEMINI_API_KEY");
                return { error: "Configuration Error: Missing API Key", status: 500 };
            }

            const genAI = new GoogleGenerativeAI(apiKey);

            // Per 2026 docs: 1.5 is deprecated/shutdown. Using 2.5 Flash Stable.
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const result = await model.generateContent({
                contents: [{ role: "user", parts: [{ text: message }] }],
                systemInstruction: systemPrompt,
                generationConfig: { maxOutputTokens: 150, temperature: 0.1 }
            });
            const response = await result.response;
            const responseText = response.text();

            let text = responseText;

            // Defensive cleanup
            text = text.split("\n")[0].trim();
            text = text.replace(/^mother\s*:\s*/i, "").trim();
            text = text.replace(/^guardian\s*:\s*/i, "").trim();

            return {
                response: text || "I don't know.",
                timestamp: new Date().toISOString(),
                source: "ai"
            };

        } catch (error) {
            console.error("Error in patient chat API (Gemini):", error);
            return { error: "Internal server error", status: 500 };
        }
    }
}
