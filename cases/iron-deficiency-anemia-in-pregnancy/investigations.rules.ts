import { InvestigationRules } from '../types';
import { detectRedFlag } from './redFlags.rules';

export function getInvestigationLogic(): InvestigationRules {
    return {
        "CBC": {
            summary: "CBC: Microcytic hypochromic anemia.",
            values: [
                { parameter: "Hemoglobin", value: "8.2", unit: "g/dL", normalRange: "11-15", status: "low" },
                { parameter: "MCV", value: "72", unit: "fL", normalRange: "80-100", status: "low" },
                { parameter: "MCHC", value: "28", unit: "g/dL", normalRange: "32-36", status: "low" }
            ],
            interpretation: "Microcytic hypochromic anemia.",
            criticalFindings: []
        },
        "Peripheral Smear": {
            summary: "Peripheral Smear: Microcytic hypochromic RBCs, pencil cells, target cells.",
            values: [],
            interpretation: "Suggestive of Iron Deficiency Anemia.",
            criticalFindings: []
        },
        "Serum Ferritin": {
            summary: "Serum Ferritin: 10 µg/L (Low).",
            values: [
                { parameter: "Ferritin", value: "10", unit: "µg/L", normalRange: "15-200", status: "low" }
            ],
            interpretation: "Iron Deficiency confirmed.",
            criticalFindings: []
        },
        "Serum Iron": {
            summary: "Serum Iron: 30 µg/L (Low).",
            values: [
                { parameter: "Iron", value: "30", unit: "µg/L", normalRange: "50-170", status: "low" }
            ],
            interpretation: "Low serum iron.",
            criticalFindings: []
        },
        "Transferrin Saturation": {
            summary: "Transferrin Saturation: 10% (Low).",
            values: [
                { parameter: "Transferrin Saturation", value: "10", unit: "%", normalRange: "20-50", status: "low" }
            ],
            interpretation: "Low transferrin saturation.",
            criticalFindings: []
        },
        "Hemoglobin Electrophoresis": {
            summary: "Hemoglobin Electrophoresis: Normal pattern (HbA > 95%, HbA2 < 3.5%).",
            values: [],
            interpretation: "Excludes Thalassemia trait.",
            criticalFindings: []
        }
    };
}
