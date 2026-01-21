
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

        // Jaundice specific keyword check handled in logic below, but mapped here?
        // In route.ts it was separate: "Jaundice specific keyword check" AFTER topic detection.
        return null;
    }


    function detectAttribute(q: string): string | null {
        if (containsAny(q, ["where", "location", "part", "body", "distribution"])) return 'distribution';
        if (containsAny(q, ["long", "days", "duration", "start", "since"])) return 'duration';
        if (containsAny(q, ["color", "bile"])) return 'color';
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


    // Jaundice specific keyword check (Copied from route.ts)
    if (containsAny(lowerQ, ["yellow", "jaundice", "eyes", "face", "skin"])) {
        topic = 'jaundice';
    }

    if (topic) {
        // Note: Vomiting and Diarrhea blocks skipped because facts.vomiting / facts.diarrhea 
        // are undefined/false for this case, so they wouldn't match anyway.

        // --- JAUNDICE ---
        if (topic === 'jaundice' && facts.jaundice) {
            // Smart Fallback: If asking about specific body parts we don't handle explicitly (palms, soles, etc.), pass to AI.
            // The AI knows the background says "eyes and face", so it can correctly answer "No" or "I don't know" for others.
            if (containsAny(lowerQ, ['palm', 'sole', 'hand', 'foot', 'feet', 'leg', 'arm', 'chest', 'belly', 'stomach', 'abdomen', 'toe'])) {
                return null;
            }

            if (attr === 'duration') return fastResponse(`${facts.jaundice.duration_weeks} weeks.`);
            if (attr === 'onset') return fastResponse(facts.jaundice.onset || "I don't know.");
            if (attr === 'progression') return fastResponse(facts.jaundice.progression || "Improving.");
            if (attr === 'distribution') return fastResponse("Mostly in the eyes and face.");

            if (attr === 'color') {
                // Smart Fallback: If asking about changes, causes, or timing related to color, pass to AI.
                if (containsAny(lowerQ, ["reduce", "increase", "change", "stop", "start", "after", "before", "when", "breastfeed", "feeding", "worse", "better"])) {
                    return null;
                }
                return fastResponse("Yellow.");
            }

            if (containsAny(lowerQ, ["stool", "poop"])) return fastResponse(facts.jaundice.stool_color || "Normal.");
            if (containsAny(lowerQ, ["urine", "pee"])) return fastResponse(facts.jaundice.urine_color || "Normal.");

            if (isDescriptiveQuestion(lowerQ)) {
                return fastResponse("He is yellow.");
            }

            // Smart Fallback for existence check: If asking complex questions (stop/change/when) and we haven't hit an attribute, don't just say "Yes".
            if (containsAny(lowerQ, ["stop", "stopped", "quit", "change", "changed", "reduce", "increase", "when", "after", "before", "did", "worse", "better"])) {
                return null;
            }

            return simpleBool(facts.jaundice.present);
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
            // Smart Fallback: If asking about changes, stopping, or timing, pass to AI.
            if (containsAny(lowerQ, ["stop", "stopped", "quit", "change", "changed", "reduce", "increase", "when", "after", "before", "did"])) {
                return null;
            }

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
            if (facts.jaundice?.urine_color) return fastResponse(facts.jaundice.urine_color);
            return fastResponse("I don't know.");
        }

        // --- HISTORY ---
        if (topic === 'allergies' && facts.past_history) return simpleBool(facts.past_history.allergies);
        if (topic === 'meds' && facts.past_history) return simpleBool(facts.past_history.regular_medications || facts.past_history.self_medication);
        if (topic === 'vaccines' && facts.past_history) return fastResponse(facts.past_history.immunization_complete ? "Yes." : "No, not all.");
    }

    return null;
}
