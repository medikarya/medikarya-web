import { NextResponse } from 'next/server';
import { getCases } from '@/data/cases';

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
