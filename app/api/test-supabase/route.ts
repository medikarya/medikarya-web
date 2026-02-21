import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET() {
    const { data, error } = await supabaseServer
        .from('case_attempts')
        .select('*')

    return NextResponse.json({ data, error })
}