
import { CaseModule, PatientFacts, CaseResponse, DiagnosisRules, InvestigationRules } from '../types';
import { handleFactQuestion } from './facts.guard';
import { getDiagnosisLogic } from './diagnosis.rules';
import { getInvestigationLogic } from './investigations.rules';
import { detectRedFlag } from './redFlags.rules';

export const viralGastroenteritisModule: CaseModule = {
    handleFactQuestion,
    detectRedFlag,
    getDiagnosisLogic,
    getInvestigationLogic,
    getAllowedTopics: () => ["vomiting", "diarrhea", "pain", "history"],
    getCaseId: () => "viral-gastroenteritis"
};
