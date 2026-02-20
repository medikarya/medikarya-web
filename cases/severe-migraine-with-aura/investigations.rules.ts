import { InvestigationRules } from '../types';
import { buildInvestigationRulesFromCaseData } from '../lib/investigation-result-builder';
import { studentAskedAboutRedFlag } from '../lib/red-flag-detector';

export function getInvestigationLogic(caseData: any): InvestigationRules {
    const base = buildInvestigationRulesFromCaseData(caseData);

    // Runtime override for MRI: add "Clinical correlation advised" unless
    // the student explicitly asked about a red flag (focal neuro symptoms).
    // This is context-aware test classification — purpose C of red-flag-detector.
    const baseMri = base["mri"];
    base["mri"] = (test: any, context: { caseData: any; chatHistory: any[] }) => {
        const askedAboutRedFlag = studentAskedAboutRedFlag(context.chatHistory, context.caseData);

        const baseResult = baseMri
            ? baseMri.summary
            : "MRI Brain: No mass lesion. No midline shift. Ventricles normal. No abnormal enhancement. Impression: Normal study.";

        return {
            ...(baseMri ?? { values: [], interpretation: "Normal MRI Brain.", criticalFindings: [] }),
            summary: askedAboutRedFlag ? baseResult : `${baseResult} Clinical correlation advised.`,
        };
    };

    return base;
}
