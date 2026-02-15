export function detectRedFlag(question: string): boolean {
    const redFlagKeywords = [
        "fever", "temperature",
        "stiff", "neck", "meningitis",
        "vision", "visual", "blind", "blur",
        "weakness", "numbness", "tingling", "paralysis", "motor", "sensory",
        "confusion", "conscious", "alert",
        "vomit", "nausea" // associated with increased ICP sometimes
    ];

    const lowerQ = question.toLowerCase();
    return redFlagKeywords.some(keyword => lowerQ.includes(keyword));
}
