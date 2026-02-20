import { CaseModule } from '../types';
import { handleFactQuestion } from './facts.guard';
import { getDiagnosisLogic } from './diagnosis.rules';
import { getInvestigationLogic } from './investigations.rules';

export const ironDeficiencyAnemiaModule: CaseModule = {
    handleFactQuestion,
    getDiagnosisLogic,
    getInvestigationLogic: (caseData: any) => getInvestigationLogic(caseData),
    getAllowedTopics: () => ["anemia", "iron", "pregnancy", "breathlessness", "fatigue"],
    getCaseId: () => "iron-deficiency-anemia-in-pregnancy"
};
