import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ChatEngine } from "../../../../../engine/chatEngine";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { caseData } = body;

    if (!caseData) {
      return NextResponse.json({ error: "Missing caseData" }, { status: 400 });
    }

    const openingLine = await ChatEngine.generateOpening(caseData);
    return NextResponse.json({ opening: openingLine });

  } catch (error) {
    console.error("Error generating opening:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
