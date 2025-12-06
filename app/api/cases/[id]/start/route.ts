import { NextResponse } from 'next/server';
import { getCaseById, updateCase } from '@/data/cases';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const caseId = params.id;
    
    // Get the current case data
    const caseData = await getCaseById(caseId);
    
    if (!caseData) {
      return NextResponse.json(
        { error: 'Case not found' },
        { status: 404 }
      );
    }
    
    // Update case status and add startedAt timestamp
    const updatedCase = {
      ...caseData,
      status: 'in-progress',
      startedAt: new Date().toISOString(),
      // Add any other fields you want to update when case starts
    };
    
    // Save the updated case
    await updateCase(caseId, updatedCase);
    
    return NextResponse.json(updatedCase);
  } catch (error) {
    console.error('Error starting case:', error);
    return NextResponse.json(
      { error: 'Failed to start case' },
      { status: 500 }
    );
  }
}
