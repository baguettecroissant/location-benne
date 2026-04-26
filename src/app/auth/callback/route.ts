import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabase } from '@/lib/supabase/server'

// GET /auth/callback — Handle Supabase email confirmation redirect
// Supabase sends ?code=... after email confirmation
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/pro/connexion'

  if (code) {
    const supabase = await createServerSupabase()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Successfully confirmed — redirect to pro connexion
      return NextResponse.redirect(new URL(next, req.url))
    }
  }

  // Fallback — redirect to connexion page even if there's an error
  return NextResponse.redirect(new URL('/pro/connexion', req.url))
}
