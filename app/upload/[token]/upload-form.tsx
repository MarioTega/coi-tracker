'use client'

import { useState } from 'react'
import { uploadCertificate } from './actions'

// This needs 'use client' because it uses useState (React state that
// changes as the user interacts) and handles a form submit event in the
// browser — Server Components can't do either of those things.
export function UploadForm({ token }: { token: string }) {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(formData: FormData) {
    setStatus('uploading')

    // This calls the Server Action directly — note there's no fetch(),
    // no API route URL, nothing like that. Next.js lets a Client
    // Component call a function marked 'use server' (see actions.ts)
    // as if it were a normal function call, and handles the network
    // request behind the scenes for you.
    const result = await uploadCertificate(token, formData)

    if (result.success) {
      setStatus('done')
    } else {
      setStatus('error')
      setErrorMessage(result.error)
    }
  }

  if (status === 'done') {
    return (
      <p className="text-green-600">
        Uploaded successfully. Thank you — you&apos;ll hear from us if anything else is needed.
      </p>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <input
        type="file"
        name="certificate"
        accept="application/pdf,image/*"
        required
        className="block w-full text-sm"
      />

      <button
        type="submit"
        disabled={status === 'uploading'}
        className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {status === 'uploading' ? 'Uploading...' : 'Upload'}
      </button>

      {status === 'error' && (
        <p className="text-red-600 text-sm">{errorMessage}</p>
      )}
    </form>
  )
}