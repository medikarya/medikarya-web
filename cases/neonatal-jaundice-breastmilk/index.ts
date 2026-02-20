import { CaseModule } from '../types';
import { handleFactQuestion } from './facts.guard';
import { getDiagnosisLogic } from './diagnosis.rules';
import { getInvestigationLogic } from './investigations.rules';

export const neonatalJaundiceModule: CaseModule = {
    handleFactQuestion,
    getDiagnosisLogic,
    getInvestigationLogic: (caseData: any) => getInvestigationLogic(caseData),
    getAllowedTopics: () => ["jaundice", "feeding", "birth_history"],
    getCaseId: () => "neonatal-jaundice-breastmilk"
};
