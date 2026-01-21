import { CaseModule } from './types';
import { neonatalJaundiceModule } from './neonatal-jaundice-breastmilk';
import { viralGastroenteritisModule } from './viral-gastroenteritis';

const caseRegistry: Record<string, CaseModule> = {
    'neonatal-jaundice-breastmilk': neonatalJaundiceModule,
    'viral-gastroenteritis': viralGastroenteritisModule,
};

export function getCaseModule(caseId: string): CaseModule | null {
    return caseRegistry[caseId] || null;
}
