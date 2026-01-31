import { PatientFacts, CaseResponse } from '../types';

export function handleFactQuestion(question: string, facts: PatientFacts): CaseResponse | null {
    const lowerQ = question.toLowerCase().trim();

    function fastResponse(text: string): CaseResponse {
        return {
            response: text || "I don't know.",
            timestamp: new Date().toISOString(),
            source: "fact"
        };
    }

    // 1. Identity - Name
    if (
        lowerQ.includes('name') ||
        lowerQ.includes('called') ||
        lowerQ.includes('who is the baby') ||
        lowerQ.includes("baby's name")
    ) {
        return fastResponse(facts.identity?.name || "Mohd. Ahzad.");
    }

    // 2. Age
    if (
        lowerQ.includes('old') ||
        lowerQ.includes('age') ||
        lowerQ.includes('weeks') ||
        lowerQ.includes('days') ||
        lowerQ.includes('how old')
    ) {
        const ageStr = facts.identity?.age_weeks
            ? `${facts.identity.age_weeks} weeks old`
            : "I don't know how old he is.";
        return fastResponse(ageStr + ".");
    }

    // 3. Gender
    if (
        lowerQ.includes('boy') ||
        lowerQ.includes('girl') ||
        lowerQ.includes('gender') ||
        lowerQ.includes('sex of the baby')
    ) {
        return fastResponse(facts.identity?.gender === 'male' ? "He's a boy." : "I don't know.");
    }

    // 4. Who are you / role (mother)
    if (
        lowerQ.includes('who are you') ||
        lowerQ.includes('mother') ||
        lowerQ.includes('mummy') ||
        lowerQ.includes('mom') ||
        lowerQ.includes("you're the")
    ) {
        return fastResponse("I'm his mother, doctor saab.");
    }

    // That's it — everything else goes to LLM
    return null;
}