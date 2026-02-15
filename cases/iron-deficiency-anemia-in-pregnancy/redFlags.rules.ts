export function detectRedFlag(question: string): boolean {
    const redFlagKeywords = [
        "bleeding", "hemorrhage",
        "chest pain", "cardiac",
        "failure", "heart",
        "seizure", "convulsion",
        "unconscious", "faint",
        "severe", "acute"
    ];

    const lowerQ = question.toLowerCase();
    return redFlagKeywords.some(keyword => lowerQ.includes(keyword));
}
