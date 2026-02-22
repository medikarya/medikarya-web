import { NextResponse } from 'next/server';
import { getCaseById } from '@/data/cases';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Get the case definition from the database
    const caseData = await getCaseById(id);

    if (!caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }

    // We append the timestamp for the frontend state, 
    // but we DO NOT save this to the global immutable database.
    const sessionData = {
      ...caseData,
      startedAt: new Date().toISOString()
    };

    return NextResponse.json(sessionData);
  } catch (error) {
    console.error('Error starting case:', error);
    return NextResponse.json(
      { error: 'Failed to start case' },
      { status: 500 }
    );
  }
}
