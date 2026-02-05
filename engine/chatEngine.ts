import { CaseData } from '../data/cases/index';
import { CaseResponse } from '../cases/types';
import { Groq } from "groq-sdk";

export class ChatEngine {

    private static sessionHistories: Map<string, Array<{ role: 'user' | 'assistant'; content: string }>> = new Map();
    private static readonly MAX_HISTORY_MESSAGES = 12; // ~6 exchanges

    static async processRequest(
        message: string,
        caseData: CaseData,
        userId: string
    ): Promise<CaseResponse | { error: string, status: number }> {

        if (!message || (!caseData?.patient_text_brief && !caseData?.patient_facts)) {
            return { error: "Missing message or patient data", status: 400 };
        }

        return await this.generateLLMResponse(message, caseData, userId);
    }

    // 🔥 THE BIG FIX — convert entire case into patient memory
    private static buildPatientMemory(caseData: CaseData): string {
        const facts = Object.entries(caseData.patient_facts || {})
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");

        const examples = (caseData.ai_examples || [])
            .map(ex => `"${ex.patient}"`)
            .join("\n");

        const role = caseData.ai_role
            ? `You are speaking as: ${caseData.ai_role.first_person_description || "the patient"}`
            : `You are speaking as: the patient`;

        return `
${role}

PATIENT NARRATIVE:
${caseData.patient_text_brief || ""}

KNOWN MEDICAL DETAILS:
${facts || "None explicitly listed."}

HOW YOU NATURALLY SPEAK:
${examples || "Simple, worried, conversational language."}
`.trim();
    }

    private static async generateLLMResponse(
        message: string,
        caseData: CaseData,
        userId: string
    ): Promise<CaseResponse | { error: string, status: number }> {

        const compiledMemory = this.buildPatientMemory(caseData);

        const systemPrompt = `
You are roleplaying as a patient in a medical consultation.

IMPORTANT BEHAVIOR RULES (very important):

• Answer ONLY what the doctor asked. Do NOT volunteer extra details.
• Keep responses to 1–2 short sentences.
• If the doctor asks a very short question ("Since when", "Vomiting?", "Where?"), give a very short answer.
• Do NOT dump your full story unless the doctor asks open questions like "Tell me what happened" or "Describe your problem".

This should feel like a real clinical interview, where the doctor extracts information step by step.

You may occasionally add ONE small extra detail or emotion, like a real worried patient.

Sometimes, when natural, you may ask a small follow-up question back to the doctor out of worry.

You understand short clinical phrases naturally.

Do NOT invent new medical facts.
If something truly isn't in your memory, say you don't know.

Never give medical advice.

PATIENT MEMORY:
${compiledMemory}
`.trim();


        const historyKey = `${userId}:${caseData.id}`;
        let history = this.sessionHistories.get(historyKey) || [];
        history = history.filter(h => h.content?.trim());

        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
            ...history.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: message }
        ];

        try {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) {
                return { error: "Missing GROQ_API_KEY", status: 500 };
            }

            const groq = new Groq({ apiKey });

            const chatCompletion = await groq.chat.completions.create({
                messages,
                model: "llama-3.3-70b-versatile",
                temperature: 0.4,
                max_completion_tokens: 120,
                stream: false
            });

            let text = chatCompletion.choices[0]?.message?.content?.trim() || "I don't know.";

            text = text.split("\n")[0].trim();
            text = text.replace(/^(patient|mother|father|guardian)\s*:\s*/i, "").trim();

            const finalResponse = text || "I don't know.";

            // Save history
            history.push({ role: "user", content: message });
            history.push({ role: "assistant", content: finalResponse });

            if (history.length > this.MAX_HISTORY_MESSAGES) {
                history = history.slice(-this.MAX_HISTORY_MESSAGES);
            }

            this.sessionHistories.set(historyKey, history);

            return {
                response: finalResponse,
                timestamp: new Date().toISOString(),
                source: "ai"
            };

        } catch (error) {
            return { error: "Internal server error", status: 500 };
        }
    }
}
