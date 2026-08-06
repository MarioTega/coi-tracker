import { createAdminClient } from '@/lib/supabase/admin'
import { UploadForm } from './upload-form'

// This is a Server Component (no 'use client' at the top) — it runs on the
// server, before the page is sent to the browser. It receives `params`,
// which Next.js fills in from the URL itself: the folder is named
// [token], so whatever the sub put in the URL after /upload/ shows up here.
export default async function UploadPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  // We use the ADMIN client here on purpose: there is no logged-in user on
  // this page at all (the sub never signs in), so there's no auth.uid()
  // for RLS to check against. RLS would block this query entirely if we
  // used the normal server client. This is the one legitimate reason to
  // reach for admin.ts outside of the actual upload action below.
  const supabase = createAdminClient()

  const { data: vendor } = await supabase
    .from('vendors')
    .select('id, company_name, token_expires_at')
    .eq('upload_token', token)
    .single()

  // Defensive checks: either the token doesn't match any vendor at all,
  // or it matched but has expired. Both cases get the same generic
  // error message — we deliberately don't say WHICH one it is, so an
  // attacker probing random tokens can't learn anything from the
  // difference between "doesn't exist" and "expired."
  const isExpired =
    vendor?.token_expires_at && new Date(vendor.token_expires_at) < new Date()

  if (!vendor || isExpired) {
    return (
      <main className="max-w-md mx-auto mt-20 text-center">
        <h1 className="text-xl font-semibold">This link isn&apos;t valid</h1>
        <p className="text-gray-500 mt-2">
          Please contact whoever sent you this link for a new one.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-semibold">
        Upload insurance certificate for {vendor.company_name}
      </h1>
      <p className="text-gray-500 mt-2 mb-6">
        Upload a PDF or photo of your current certificate of insurance.
      </p>
      <UploadForm token={token} />
    </main>
  )
}