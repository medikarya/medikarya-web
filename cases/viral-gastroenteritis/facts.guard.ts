
import { PatientFacts, CaseResponse } from '../types';

export function handleFactQuestion(question: string, facts: PatientFacts): CaseResponse | null {
    const lowerQ = question.toLowerCase().trim();

    // Helpers (copied from route.ts)
    function containsAny(text: string, keywords: string[]) {
        return keywords.some(k => text.includes(k));
    }

    function isDescriptiveQuestion(q: string) {
        return containsAny(q, ["how is", "how are", "describe"]);
    }

    function fastResponse(text: string): CaseResponse {
        if (!text) text = "I don't know.";
        return {
            response: text,
            timestamp: new Date().toISOString(),
            source: "fact"
        };
    }

    function simpleBool(val: boolean | null | undefined): CaseResponse {
        if (val === true) return fastResponse("Yes.");
        if (val === false) return fastResponse("No.");
        return fastResponse("I don't know.");
    }

    function detectTopic(q: string): string | null {
        if (containsAny(q, ["vomit", "puke", "throw up"])) return 'vomiting';
        if (containsAny(q, ["stool", "poop", "diarrhea", "loose motion"])) return 'diarrhea';
        if (containsAny(q, ["fever", "hot", "temp"])) return 'fever';
        if (containsAny(q, ["pain", "hurt", "cry", "stomach", "abdomen"])) return 'pain';
        if (containsAny(q, ["name", "who is", "called", "baby"])) return 'identity';
        if (containsAny(q, ["old", "age"])) return 'identity';
        if (containsAny(q, ["boy", "girl", "gender"])) return 'identity';
        if (containsAny(q, ["who are you", "relationship", "mother"])) return 'identity';

        if (containsAny(q, ["eat", "food", "appetite", "feeding", "drink", "diet", "milk"])) return 'intake';
        if (containsAny(q, ["urine", "pee", "wet", "diaper"])) return 'output';

        if (containsAny(q, ["allergy", "allergies"])) return 'allergies';
        if (containsAny(q, ["meds", "medicine", "drug"])) return 'meds';
        if (containsAny(q, ["vaccine", "shot", "immunization"])) return 'vaccines';

        return null;
    }

    function detectAttribute(q: string): string | null {
        if (containsAny(q, ["long", "days", "duration", "start", "since"])) return 'duration';
        if (containsAny(q, ["color", "green", "bile", "yellow"])) return 'color';
        if (containsAny(q, ["blood", "bloody"])) return 'blood';
        if (containsAny(q, ["progression", "better", "worse"])) return 'progression';
        if (containsAny(q, ["many", "times", "freq", "often"])) return 'frequency';
        if (containsAny(q, ["force", "projectile"])) return 'forceful';
        if (containsAny(q, ["bilious"])) return 'bilious';
        if (containsAny(q, ["onset", "start"])) return 'onset';

        // Identity attributes
        if (containsAny(q, ["name", "called"])) return 'name';
        if (containsAny(q, ["old", "age"])) return 'age';
        if (containsAny(q, ["boy", "girl", "gender"])) return 'gender';
        if (containsAny(q, ["who are you", "relationship", "mother"])) return 'role';

        return null;
    }

    let topic = detectTopic(lowerQ);
    const attr = detectAttribute(lowerQ);

    // 🔒 FIX 1: Attribute → topic fallback (Copied from route.ts)
    if (!topic && ['forceful', 'bilious', 'blood', 'color'].includes(attr ?? '')) {
        if (attr === 'forceful' || attr === 'bilious') topic = 'vomiting';
    }


    if (topic) {
        // --- VOMITING ---
        if (topic === 'vomiting' && facts.vomiting) {
            // Smart Fallback: Complex questions -> AI
            if (containsAny(lowerQ, ["stop", "stopped", "quit", "change", "changed", "reduce", "increase", "when", "after", "before", "did"])) {
                return null;
            }

            if (attr === 'duration') return fastResponse(`${facts.vomiting.duration_days} days.`);
            if (attr === 'progression') return fastResponse(facts.vomiting.progression || "I don't know.");
            if (attr === 'frequency') return fastResponse("I don't know.");
            if (attr === 'forceful') return simpleBool(facts.vomiting.projectile);

            // 🔒 FIX 2: Handle color
            if (attr === 'color') return simpleBool(facts.vomiting.bilious);

            if (attr === 'blood') return simpleBool(facts.vomiting.blood);
            if (attr === 'bilious') return simpleBool(facts.vomiting.bilious);

            // 🔒 FIX 3: Safety net - Attribute questions must NOT become "Yes"
            if (isDescriptiveQuestion(lowerQ)) {
                return fastResponse("He is vomiting.");
            }

            // 🔒 FIX 4: Descriptive question → short lived description
            if (attr) return fastResponse("I don't know.");

            // Default existence (only for pure "Is he vomiting?" questions)
            return simpleBool(facts.vomiting.present);
        }

        // --- DIARRHEA ---
        if (topic === 'diarrhea' && facts.diarrhea) {
            // Smart Fallback: Complex questions -> AI
            if (containsAny(lowerQ, ["stop", "stopped", "quit", "change", "changed", "reduce", "increase", "when", "after", "before", "did"])) {
                return null;
            }

            if (attr === 'duration') return fastResponse(`${facts.diarrhea.duration_days} days.`);
            if (attr === 'frequency') return fastResponse(`${facts.diarrhea.frequency_per_day} times.`);
            if (attr === 'blood') return simpleBool(facts.diarrhea.bloody);
            if (attr === 'color') return fastResponse(facts.diarrhea.appearance || "Pale.");

            if (isDescriptiveQuestion(lowerQ)) {
                return fastResponse("He has loose stools.");
            }

            // Default existence
            return simpleBool(facts.diarrhea.present);
        }



        // --- FEVER ---
        if (topic === 'fever' && facts.general) {
            return simpleBool(facts.general.fever);
        }
        if (topic === 'fever' && facts.fever) {
            return simpleBool(facts.fever.present);
        }

        // --- ABDOMINAL PAIN ---
        if (topic === 'pain' && facts.abdominal_pain) {
            return simpleBool(facts.abdominal_pain.present);
        }

        // --- IDENTITY ---
        if (topic === 'identity' && facts.identity) {
            if (attr === 'name') return fastResponse(facts.identity.name);
            if (attr === 'age') return fastResponse(`${facts.identity.age_years || facts.identity.age_weeks + " weeks"}.`);
            if (attr === 'gender') return fastResponse(facts.identity.gender);
            if (attr === 'role') return fastResponse(facts.ai_role_response || "I'm the mother.");
            return fastResponse(facts.identity.name);
        }

        // --- INTAKE / DIET ---
        if (topic === 'intake') {
            if (containsAny(lowerQ, ["what", "kind", "type", "diet", "usually"])) {
                if (facts.lifestyle?.diet) return fastResponse(facts.lifestyle.diet);
                if (facts.feeding?.exclusive_breastfeeding) return fastResponse("Only breast milk.");
            }
            if (facts.general?.poor_feeding === true) return fastResponse("No, he is not eating well.");
            if (facts.general?.poor_feeding === false) return fastResponse("Yes, he feeds well.");

            if (facts.lifestyle?.diet) return fastResponse(facts.lifestyle.diet);
            if (facts.feeding?.exclusive_breastfeeding) return fastResponse("Only breast milk.");
        }


        // --- OUTPUT / URINE ---
        if (topic === 'output') {
            return fastResponse("I don't know.");
        }

        // --- HISTORY ---
        if (topic === 'allergies' && facts.past_history) return simpleBool(facts.past_history.allergies);
        if (topic === 'meds' && facts.past_history) return simpleBool(facts.past_history.regular_medications || facts.past_history.self_medication);
        if (topic === 'vaccines' && facts.past_history) return fastResponse(facts.past_history.immunization_complete ? "Yes." : "No, not all.");
    }

    return null;
}
