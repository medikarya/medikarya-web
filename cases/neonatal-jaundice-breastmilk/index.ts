
import { CaseModule, PatientFacts, CaseResponse, DiagnosisRules, InvestigationRules } from '../types';
import { handleFactQuestion } from './facts.guard';
import { getDiagnosisLogic } from './diagnosis.rules';
import { getInvestigationLogic } from './investigations.rules';
import { detectRedFlag } from './redFlags.rules';

export const neonatalJaundiceModule: CaseModule = {
    handleFactQuestion,
    detectRedFlag,
    getDiagnosisLogic,
    getInvestigationLogic,
    getAllowedTopics: () => ["jaundice", "feeding", "birth_history"], // Metadata
    getCaseId: () => "neonatal-jaundice-breastmilk"
};
