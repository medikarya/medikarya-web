"use server";

import { EvaluationEngine } from "@/engine/evaluationEngine";

export async function evaluateCase(
    diagnosis: any,
    orderedTests: any[],
    chatHistory: any[],
    caseData: any
) {
    try {
        console.log("Evaluating case for:", caseData.patient.name);
        const result = await EvaluationEngine.evaluate(
            diagnosis,
            orderedTests,
            chatHistory,
            caseData
        );
        return result;
    } catch (error) {
        console.error("Evaluation Server Action Failed", error);
        throw new Error("Failed to evaluate case");
    }
}
