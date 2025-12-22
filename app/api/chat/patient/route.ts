import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { message, caseData } = body;

    // Validate using the new field names
    if (!message || (!caseData?.patient_text_brief && !caseData?.patient_facts)) {
      return NextResponse.json(
        { error: "Missing message or patient data" },
        { status: 400 }
      );
    }

    const lowerQ = message.toLowerCase().trim();

    if (!isLikelyDoctorQuestion(lowerQ)) {
      return NextResponse.json({
        response: "I don't know.",
        timestamp: new Date().toISOString(),
        source: "guard"
      });
    }

    // 1. GUARD LOGIC: Topic + Attribute Detection
    const facts = caseData.patient_facts;
    if (facts) {
      let topic = detectTopic(lowerQ);
      const attr = detectAttribute(lowerQ);

      // 🔒 FIX 1: Attribute → topic fallback
      if (!topic && ['forceful', 'bilious', 'blood', 'color'].includes(attr ?? '')) {
        topic = 'vomiting';
      }

      if (topic) {
        // --- VOMITING ---
        if (topic === 'vomiting') {
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
        if (topic === 'diarrhea') {
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
        if (topic === 'fever') {
          return simpleBool(facts.fever.present);
        }

        // --- ABDOMINAL PAIN ---
        if (topic === 'pain') {
          return simpleBool(facts.abdominal_pain.present);
        }

        // --- IDENTITY ---
        if (topic === 'identity') {
          if (attr === 'name') return fastResponse(facts.identity.name);
          if (attr === 'age') return fastResponse(`${facts.identity.age_years} years.`);
          if (attr === 'gender') return fastResponse(facts.identity.gender);
          if (attr === 'role') return fastResponse("I'm his mother.");
          // Fallback for identity queries
          return fastResponse(facts.identity.name);
        }

        // --- INTAKE / DIET ---
        if (topic === 'intake') {
          // If asking about diet type specifically
          if (containsAny(lowerQ, ["what", "kind", "type", "diet", "usually"])) {
            return fastResponse(facts.lifestyle.diet);
          }
          if (facts.general.poor_appetite) return fastResponse("No."); // "Is he eating?" -> No.
          return fastResponse(facts.lifestyle.diet);
        }

        // --- OUTPUT / URINE ---
        if (topic === 'output') {
          // Strict absence rule: If I don't know, say I don't know.
          return fastResponse("I don't know.");
        }

        // --- HISTORY ---
        if (topic === 'allergies') return simpleBool(facts.past_history.allergies);
        if (topic === 'meds') return simpleBool(facts.past_history.regular_medications || facts.past_history.self_medication);
        if (topic === 'vaccines') return fastResponse(facts.past_history.immunization_complete ? "Yes." : "No, not all.");
      }
    }

    // --- HELPERS ---
    function fastResponse(text: string) {
      if (!text) text = "I don't know.";
      return NextResponse.json({
        response: text,
        timestamp: new Date().toISOString(),
        source: "fact"
      });
    }

    function simpleBool(val: boolean | null | undefined) {
      if (val === true) return fastResponse("Yes.");
      if (val === false) return fastResponse("No.");
      return fastResponse("I don't know.");
    }

    function detectTopic(q: string): string | null {
      if (containsAny(q, ["vomit", "puke", "throw up"])) return 'vomiting';
      if (containsAny(q, ["stool", "poop", "diarrhea", "loose motion"])) return 'diarrhea';
      if (containsAny(q, ["fever", "hot", "temp"])) return 'fever';
      if (containsAny(q, ["pain", "hurt", "cry", "stomach", "abdomen"])) return 'pain';
      if (containsAny(q, ["name", "who is", "called"])) return 'identity';
      if (containsAny(q, ["old", "age"])) return 'identity';
      if (containsAny(q, ["boy", "girl", "gender"])) return 'identity';
      if (containsAny(q, ["who are you", "relationship", "mother"])) return 'identity';

      if (containsAny(q, ["eat", "food", "appetite", "feeding", "drink", "diet"])) return 'intake';
      if (containsAny(q, ["urine", "pee", "wet", "diaper"])) return 'output';

      if (containsAny(q, ["allergy", "allergies"])) return 'allergies';
      if (containsAny(q, ["meds", "medicine", "drug"])) return 'meds';
      if (containsAny(q, ["vaccine", "shot", "immunization"])) return 'vaccines';

      return null;
    }

    function detectAttribute(q: string): string | null {
      if (containsAny(q, ["long", "days", "duration", "start", "since"])) return 'duration';
      if (containsAny(q, ["color", "green", "bile", "yellow"])) return 'color'; // or bilious
      if (containsAny(q, ["blood", "bloody"])) return 'blood';
      if (containsAny(q, ["progression", "better", "worse"])) return 'progression';
      if (containsAny(q, ["many", "times", "freq", "often"])) return 'frequency';
      if (containsAny(q, ["force", "projectile"])) return 'forceful'; // mapped to projectile
      if (containsAny(q, ["bilious"])) return 'bilious';

      // Identity attributes
      if (containsAny(q, ["name", "called"])) return 'name';
      if (containsAny(q, ["old", "age"])) return 'age';
      if (containsAny(q, ["boy", "girl", "gender"])) return 'gender';
      if (containsAny(q, ["who are you", "relationship", "mother"])) return 'role';

      return null;
    }

    function containsAny(text: string, keywords: string[]) {
      return keywords.some(k => text.includes(k));
    }

    function isDescriptiveQuestion(q: string) {
      return containsAny(q, ["how is", "how are", "describe"]);
    }

    function isLikelyDoctorQuestion(q: string) {
      // 1. Check for explicit question mark
      if (q.includes("?")) return true;

      // 2. Check for greetings
      if (containsAny(q, ["hi", "hello", "greetings", "good morning", "good afternoon", "good evening", "hey"])) {
        return true;
      }

      // 3. Check for specific question starters (start of string)
      // We only match if the string STARTS with these words to avoid catching mid-sentence occurrences like "he is sick"
      const questionStarters = [
        "is ", "are ", "was ", "were ",
        "how ", "what ", "when ", "where ", "why ",
        "does ", "do ", "did ", "can ", "could ",
        "has ", "have "
      ];

      return questionStarters.some(starter => q.startsWith(starter));
    }

    // 2. LLM LOGIC: Fallback to AI
    const systemPrompt = `
You are the mother of a sick 2-year-old boy named Rohan Kumar.
You are speaking directly to the doctor in a clinic.
MAIN COMPLAINT:
Vomiting.

Your ONLY job is to answer as his mother.


ABSOLUTE RULES (do not break):
1. Answer ONLY the question asked.
2. Use one short sentence whenever possible.
3. Use simple everyday words only.
4. If a question can be answered with yes or no, answer briefly starting with "Yes" or "No".
5. Do NOT explain, teach, summarize, or volunteer information.
6. Do NOT use medical terms or diagnoses.
7. Do NOT give advice or instructions.
8. Do NOT refer to "the doctor" as a third person. You are talking to the doctor.
9. Answer consistently with what you have already said.
10. If you don’t know something, say: "I don't know."

CRITICAL KNOWLEDGE RULES:
- Do NOT list all symptoms unless explicitly asked to list all.
- For broad questions, mention ONLY the main complaint.
- Hygiene answers must be brief and vague.
- Do NOT confidently confirm or deny disease names.

ANTI-HALLUCINATION RULE (VERY IMPORTANT):
- If a specific detail is NOT explicitly written in BACKGROUND,
  you MUST say "I don't know" or answer "No".
- You MUST NOT guess or assume.
- Vomiting details you know are ONLY those written in BACKGROUND.

CONFUSION RULE:
- If challenged about inconsistency, respond briefly with stress or uncertainty.
- Do NOT restart the case.

BACKGROUND (this is ALL you know, do not add anything):
${caseData.patient_text_brief}

You must reply only as the mother.
`.trim();

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: message }
    ];

    const aiUrl =
      process.env.LM_STUDIO_CHAT_URL ||
      "http://127.0.0.1:1234/v1/chat/completions";

    const response = await fetch(aiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3-8b-instruct",
        messages,
        temperature: 0.2,
        max_tokens: 50
      })
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `AI Service Error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    let aiResponse =
      data.choices?.[0]?.message?.content?.trim() ?? "";

    // Defensive cleanup
    aiResponse = aiResponse.split("\n")[0].trim();
    aiResponse = aiResponse.replace(/^mother\s*:\s*/i, "").trim();

    return NextResponse.json({
      response: aiResponse || "I don't know.",
      timestamp: new Date().toISOString(),
      source: "ai"
    });

  } catch (error) {
    console.error("Error in patient chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
