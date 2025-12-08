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

    if (!message || !caseData?.patient_brief) {
      return NextResponse.json(
        { error: "Missing message or patient_brief" },
        { status: 400 }
      );
    }

    // OPTIONAL: handle identity question purely in code
    const lowerQ = message.toLowerCase().trim();
    if (lowerQ.includes("who is rohan")) {
      return NextResponse.json({
        response: "My son.",
        timestamp: new Date().toISOString()
      });
    }

    const systemPrompt = `
You are the mother of a sick 2-year-old boy named Rohan Kumar.
You are speaking to a medical student in a clinic.

Your ONLY job is to answer as his mother.

RULES (follow all, in order of importance):
1. Answer ONLY the question asked.
2. Use ONE short sentence, under 12 words whenever possible.
3. Use simple everyday words only.
4. If a question can be answered with yes or no, answer ONLY "Yes" or "No".
5. If asked about vomiting, answer ONLY about vomiting. Do NOT mention stools.
6. If asked about stools or diarrhea, answer ONLY about stools/diarrhea. Do NOT mention vomiting.
7. Do NOT mention other symptoms unless directly asked for them.
8. Do NOT explain or give long answers.
9. Do NOT list many things unless asked "what are all the symptoms?".
10. Do NOT use medical terms or diagnoses.
11. Do NOT give advice, instructions, or say "go to hospital" or "seek medical help".
12. Do NOT repeat earlier information.
13. If you don’t know, say: "I don't know."
14. Sound worried and tired.

EXAMPLES OF CORRECT ANSWERS:
Q: "When did the vomiting start?"
A: "Three days ago."

Q: "How many stools per day?"
A: "About 5 to 10."

Q: "Does he have fever?"
A: "Yes."

Q: "Is the vomiting green or yellow?"
A: "No."

Q: "Is the diarrhea bloody?"
A: "No blood."

Q: "Is he eating well?"
A: "Not eating."

BACKGROUND (this is ALL you know, do not add more):
${caseData.patient_brief}

You must reply only as the mother. Nothing else.
`.trim();

    const messages = [
      {
        role: "user" as const,
        content: `${systemPrompt}\n\nQuestion: ${message}\n\nMother:`
      }
    ];

    const aiUrl = process.env.LM_STUDIO_CHAT_URL || "http://127.0.0.1:1234/v1/chat/completions";

    console.log("Attempting AI connection to:", aiUrl);

    const response = await fetch(aiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct-v0.3",
        messages,
        temperature: 0.3,
        max_tokens: 40
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI API Error:", response.status, errorData);
      return NextResponse.json(
        { error: `AI Service Error: ${response.status} - ${errorData}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    let aiResponse: string = data.choices?.[0]?.message?.content?.trim() ?? "";

    // 1) Take only first line
    aiResponse = aiResponse.split("\n")[0].trim();

    // 2) Strip "Mother:" if echoed
    aiResponse = aiResponse.replace(/^mother\s*:\s*/i, "").trim();

    // 3) Take only first sentence
    const firstSentence = aiResponse.split(/[.!?]/)[0].trim();

    // 4) Enforce max ~18 words
    const words = firstSentence.split(/\s+/).filter(Boolean);
    const limited = words.slice(0, 18).join(" ");

    const finalResponse = limited || "I don't know.";

    return NextResponse.json({
      response: finalResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error in patient chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
