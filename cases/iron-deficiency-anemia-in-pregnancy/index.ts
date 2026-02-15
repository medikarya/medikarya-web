import { CaseModule } from '../types';
import { handleFactQuestion } from './facts.guard';
import { getDiagnosisLogic } from './diagnosis.rules';
import { getInvestigationLogic } from './investigations.rules';
import { detectRedFlag } from './redFlags.rules';

export const ironDeficiencyAnemiaModule: CaseModule = {
    handleFactQuestion,
    detectRedFlag,
    getDiagnosisLogic,
    getInvestigationLogic,
    getAllowedTopics: () => ["anemia", "iron", "pregnancy", "breathlessness", "fatigue"], // Metadata based on case keywords
    getCaseId: () => "iron-deficiency-anemia-in-pregnancy"
};
