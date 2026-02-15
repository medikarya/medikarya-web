import { InvestigationRules } from '../types';


import { detectRedFlag } from './redFlags.rules';

export function getInvestigationLogic(): InvestigationRules {
    return {
        "MRI": (test: any, context: { caseData: any, chatHistory: any[] }) => {
            // Check if red flags were excluded in chat history
            const hasAskedRedFlags = context.chatHistory.some(msg =>
                msg.role === 'user' && detectRedFlag(msg.content)
            );

            const baseResult = "MRI Brain: No mass lesion. No midline shift. Ventricles normal in size. No abnormal enhancement. Impression: Normal study.";

            return {
                summary: hasAskedRedFlags ? baseResult : `${baseResult} Clinical correlation advised.`,
                values: [],
                interpretation: "Normal MRI Brain.",
                criticalFindings: []
            };
        },
        "CT": {
            summary: "CT Brain: No hemorrhage. No space occupying lesion. No edema.",
            values: [],
            interpretation: "Normal CT Brain.",
            criticalFindings: []
        },
        "Fundoscopy": {
            summary: "Fundoscopy: Optic disc margins sharp. No papilledema.",
            values: [],
            interpretation: "Normal Fundoscopy.",
            criticalFindings: []
        },
        "Blood Pressure": {
            summary: "Blood pressure: 118/76 mmHg.",
            values: [
                { parameter: "BP", value: "118/76", unit: "mmHg", normalRange: "90/60-120/80", status: "normal" }
            ],
            interpretation: "Normotensive.",
            criticalFindings: []
        },
        "CBC": {
            summary: "CBC: Hemoglobin normal. No leukocytosis.",
            values: [
                { parameter: "Hemoglobin", value: "13.5", unit: "g/dL", normalRange: "12-15.5", status: "normal" },
                { parameter: "WBC", value: "7.2", unit: "10^9/L", normalRange: "4.5-11.0", status: "normal" }
            ],
            interpretation: "Normal CBC.",
            criticalFindings: []
        }
    };
}
