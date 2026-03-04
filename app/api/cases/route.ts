import { NextResponse } from 'next/server';
import { getCases } from '@/data/cases';

// Cache responses for 1 hour — cases rarely change
export const revalidate = 3600;

export async function GET() {
  try {
    const cases = await getCases();
    return NextResponse.json(cases);
  } catch (error) {
    console.error('Error fetching cases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cases' },
      { status: 500 }
    );
  }
}
