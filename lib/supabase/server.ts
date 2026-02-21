import { createClient } from '@supabase/supabase-js'

export const supabaseServer = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!
)