import { createBrowserClient } from '@supabase/ssr'

// Used in Client Components (anything with 'use client').
// Runs in the user's browser, so it only ever uses the public anon key —
// RLS policies are what keep this safe, since the anon key alone grants
// no special access.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}