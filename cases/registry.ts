import { CaseModule } from './types';
import { neonatalJaundiceModule } from './neonatal-jaundice-breastmilk';
import { viralGastroenteritisModule } from './viral-gastroenteritis';
import { severeMigraineModule } from './severe-migraine-with-aura';
import { ironDeficiencyAnemiaModule } from './iron-deficiency-anemia-in-pregnancy';

const caseRegistry: Record<string, CaseModule> = {
    'neonatal-jaundice-breastmilk': neonatalJaundiceModule,
    'viral-gastroenteritis': viralGastroenteritisModule,
    'severe-migraine-with-aura': severeMigraineModule,
    'iron-deficiency-anemia-in-pregnancy': ironDeficiencyAnemiaModule,
};

export function getCaseModule(caseId: string): CaseModule | null {
    return caseRegistry[caseId] || null;
}
