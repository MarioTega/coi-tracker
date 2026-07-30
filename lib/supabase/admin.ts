import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// DANGER: this client uses the service_role key, which BYPASSES row level
// security entirely. It can read and write ANY organization's data.
//
// Only ever import this file from server-side code that never runs in the
// browser (Route Handlers, Server Actions) — never from a Client Component,
// never from anything in the client.ts/server.ts pattern above.
//
// This exists for exactly one reason in this app right now: the sub-facing
// upload route has no logged-in user (no auth.uid()), so RLS can't help it.
// That route must do its OWN authorization check — validating the
// upload_token against the vendors table in code — before using this
// client to insert anything. Never use this client without that check.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}