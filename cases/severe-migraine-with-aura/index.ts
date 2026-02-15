import { CaseModule } from '../types';
import { handleFactQuestion } from './facts.guard';
import { getDiagnosisLogic } from './diagnosis.rules';
import { getInvestigationLogic } from './investigations.rules';
import { detectRedFlag } from './redFlags.rules';

export const severeMigraineModule: CaseModule = {
    handleFactQuestion,
    detectRedFlag,
    getDiagnosisLogic,
    getInvestigationLogic,
    getAllowedTopics: () => ["migraine", "aura", "headache", "photophobia", "vomiting"], // Metadata based on case keywords
    getCaseId: () => "severe-migraine-with-aura"
};
