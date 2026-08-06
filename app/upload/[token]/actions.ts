'use server'

import { createAdminClient } from '@/lib/supabase/admin'

// 'use server' at the top of the file marks EVERYTHING in it as code that
// only ever runs on the server, never shipped to the browser — even
// though the Client Component above calls it as if it were a normal
// function. This is what makes it safe to use createAdminClient() here.
export async function uploadCertificate(
  token: string,
  formData: FormData
): Promise<{ success: true } | { success: false; error: string }> {
  const supabase = createAdminClient()

  // STEP 1 — re-validate the token, on the server, again.
  // Never trust that a request reaching this function actually came from
  // the page we built. Someone could call this action directly with a
  // fabricated token if we didn't check it here too — the page-level
  // check earlier only controls what a normal user sees in their
  // browser, it does not restrict what requests the server will accept.
  const { data: vendor } = await supabase
    .from('vendors')
    .select('id, token_expires_at')
    .eq('upload_token', token)
    .single()

  const isExpired =
    vendor?.token_expires_at && new Date(vendor.token_expires_at) < new Date()

  if (!vendor || isExpired) {
    return { success: false, error: 'This upload link is not valid.' }
  }

  // STEP 2 — pull the file out of the submitted form data and do basic
  // validation before touching storage or the database at all.
  const file = formData.get('certificate') as File | null

  if (!file || file.size === 0) {
    return { success: false, error: 'Please choose a file to upload.' }
  }

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/heic']
  if (!allowedTypes.includes(file.type)) {
    return { success: false, error: 'Please upload a PDF or photo file.' }
  }

  const maxSizeBytes = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSizeBytes) {
    return { success: false, error: 'File is too large (10MB max).' }
  }

  // STEP 3 — upload the file to Supabase Storage.
  // The path is namespaced by vendor.id, not by anything guessable, and
  // this bucket is configured as PRIVATE (not public) — nobody can load
  // this file just by knowing its path. Reading it back later always
  // goes through a signed URL your own server code generates, which we
  // build in the GC-dashboard stage.
  const filePath = `${vendor.id}/${Date.now()}-${file.name}`

  const { error: storageError } = await supabase.storage
    .from('certificates')
    .upload(filePath, file)

  if (storageError) {
    return { success: false, error: 'Upload failed. Please try again.' }
  }

  // STEP 4 — create the database record pointing at that file.
  // Note extraction_status starts as 'pending' — the OCR stage we build
  // next is what picks this row up and fills in carrier_name,
  // expiration_date, etc.
  const { data: certificate, error: insertError } = await supabase
    .from('certificates')
    .insert({
      vendor_id: vendor.id,
      file_path: filePath,
      extraction_status: 'pending',
    })
    .select('id')
    .single()

  if (insertError || !certificate) {
    return { success: false, error: 'Something went wrong saving your upload.' }
  }

  // STEP 5 — record this in the audit log. We need the vendor's
  // organization_id for this table, so we do one more small lookup.
  const { data: vendorOrg } = await supabase
    .from('vendors')
    .select('organization_id')
    .eq('id', vendor.id)
    .single()

  if (vendorOrg) {
    await supabase.from('audit_events').insert({
      certificate_id: certificate.id,
      organization_id: vendorOrg.organization_id,
      actor_user_id: null, // no logged-in user — this was the sub, not a platform user
      action: 'upload',
      metadata: { source: 'sub_upload_portal' },
    })
  }

  return { success: true }
}