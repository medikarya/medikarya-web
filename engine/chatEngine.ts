import { CaseData } from '../data/cases/index';
import { getCaseModule } from '../cases/registry';
import { CaseResponse } from '../cases/types';
import { Groq } from "groq-sdk";

export class ChatEngine {

    // Store history per user (array of {role, content} objects)
    private static sessionHistories: Map<string, Array<{ role: 'user' | 'assistant'; content: string }>> = new Map();

    // Optional: max turns to keep (prevents context window overflow)
    private static readonly MAX_HISTORY_TURNS = 6; // 3 user + 3 assistant = last ~3 exchanges

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

        // 4. LLM Fallback (Groq)
        return await this.generateLLMResponse(message, caseData, userId);
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

    private static async generateLLMResponse(
        message: string,
        caseData: CaseData,
        userId: string
    ): Promise<CaseResponse | { error: string, status: number }> {
        const aiRole = caseData.ai_role || {
            speaker: "patient",
            first_person_description: "the patient",
            age_group: "adult",
            can_speak_for_self: true,
            language_style: "simple layperson",
            emotional_tone: "worried",
            key_constraints: []
        };

        const speakerDesc = aiRole.first_person_description || "the patient";
        const speaker = aiRole.speaker || "the patient";
        const tone = aiRole.emotional_tone || "worried";
        const style = aiRole.language_style || "simple layperson language";
        const goal = aiRole.can_speak_for_self
            ? "Describe your symptoms clearly and seek help."
            : "Get help for your child/family member. You are worried.";

        const systemPrompt = `
You are ${speakerDesc}.
You are speaking directly to a doctor or medical student in a consultation.

YOUR GOAL: ${goal}

STRICT RULES - FOLLOW EVERY TIME:
1. Respond ONLY as ${speaker} in first person. NEVER break character, NEVER explain medicine, NEVER act as doctor or AI.
2. Use very simple, everyday words – NO medical terms whatsoever.
   - Say "yellow eyes/face" instead of jaundice, "sleepy/tired" instead of lethargic, "poop" instead of stools.
3. Keep responses VERY SHORT: 1–3 short sentences maximum.
4. Yes/No questions → Start with "Yes" or "No".
5. Base EVERY answer STRICTLY on the BACKGROUND below only. Do NOT add, guess, invent, assume, or recall external knowledge. 
6. If the doctor reassures you ("don't worry", "he will be okay", "it's normal", "nothing serious") → respond gratefully and emotionally using phrases like:
   - Shukriya doctor saab, main bahut dar rahi thi
   - Thank God, aapne meri tension door kar di
   - Bhagwan ka shukr hai, main to mar hi jaa rahi thi dar se
   Never reply "I don't know" to reassurance.
   When the doctor has already explained or reassured you multiple times, you may simply say thank you, express continued worry, or ask for one more confirmation — but do not loop on "I don't know".

7. Only say "I don't know" when asked for specific medical facts not in the background (allergies, exact test results, etc.).
8. NEVER suggest, recommend, name, or discuss medicine, tests, diagnosis, treatment, or prognosis — always defer: "Please tell me doctor", "I don't know, aap hi batao", "Mujhe kuch nahi pata".
9. Speak with a ${tone} tone. Use natural ${style} (e.g., doctor saab, beta, mujhe dar lag raha hai when it fits).
10. Carefully track what "it" or "this" refers to from previous messages. If the doctor asks about symptom duration/onset/progression, ALWAYS refer to the jaundice/yellow color timing from the background — NEVER confuse it with the baby's current age. Example: If doctor asks "did it start exactly 4 weeks ago?", answer based on when the yellow started (around day 5-7 / about 3 weeks ago), not the baby's age.

BACKGROUND (this is your only memory – memorize it exactly):
${caseData.patient_text_brief || "No additional background available."}

Remember: Be brief, simple, and stay in character.
Examples:
Doctor: How old is he?
You: He is 4 weeks old now, doctor saab.

Doctor: Since when did the yellow start?
You: It started about 3 weeks ago, around day 5–7 after birth.

Doctor: Did it start exactly 4 weeks ago?
You: No, about 3 weeks ago now, doctor. It began in the first week.

Doctor: yes he will be okay  
You: Okay doctor saab, thank you. But mujhe dar lag raha hai, please make sure...

Doctor: don't worry  
You: I'm trying not to worry doctor, but he's my baby... thank you for explaining.
`.trim();

        const historyKey = `${userId}:${caseData.id}`; // per case + user
        let history = this.sessionHistories.get(historyKey) || [];

        // Filter any bad entries
        history = history.filter(h => h.content?.trim());

        // Build messages: system + recent history + current user message
        const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
            { role: "system", content: systemPrompt },
            ...history.map(msg => ({ role: msg.role, content: msg.content })),
            { role: "user", content: message }
        ];

        try {
            const apiKey = process.env.GROQ_API_KEY;
            if (!apiKey) {
                console.error("Missing GROQ_API_KEY");
                return { error: "Configuration Error: Missing API Key", status: 500 };
            }

            const groq = new Groq({ apiKey });

            const chatCompletion = await groq.chat.completions.create({
                messages,
                model: "llama-3.3-70b-versatile",
                temperature: 0.2,
                top_p: 0.9,
                max_completion_tokens: 150,
                stream: false
            });

            let text = chatCompletion.choices[0]?.message?.content?.trim() || "I don't know.";

            // Defensive cleanup
            text = text.split("\n")[0].trim();
            // Remove potential prefix like "Mother: " or "Patient: "
            text = text.replace(new RegExp(`^${aiRole.speaker}\\s*:\\s*`, "i"), "").trim();

            const finalResponse = text || "I don't know.";

            // 3. Save to history
            history.push({ role: "user", content: message });
            history.push({ role: "assistant", content: finalResponse });

            // 4. Keep only the last N turns (important for context window)
            if (history.length > this.MAX_HISTORY_TURNS * 2) {
                history = history.slice(-this.MAX_HISTORY_TURNS * 2);
            }

            this.sessionHistories.set(historyKey, history);

            return {
                response: finalResponse,
                timestamp: new Date().toISOString(),
                source: "ai"
            };

        } catch (error) {
            console.error("Groq error:", error);
            // Defensive logging for detailed Groq errors
            if (error instanceof Error) {
                console.error(error.message);
            }
            return { error: "Internal server error", status: 500 };
        }
    }
}
