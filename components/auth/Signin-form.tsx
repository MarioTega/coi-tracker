'use client';
import { useState, useEffect, useRef } from 'react';
import {SignInAction} from '@/app/(auth)/sign-in/actions'

export default function SignInForm(){
    const [error,setError]= useState<string | null>(null)
    const [loading,setLoading]= useState(false)
    const [status,setStatus]= useState<'idle' | 'success' | 'error'>('idle')

    async function handleSubmit(formdata: FormData) {
        setLoading(true)
        const result= await SignInAction(formdata)
        if(result.success){
            setStatus('success')



        }else{
            setStatus('error')
            setError(result?.error || 'An error occurred during sign-in.')
        }
        setLoading(false)

    }
    return(
        <form action={handleSubmit} className="flex flex-col gap-4">
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
            </button>
            {status==='error' && <p className="text-red-500 bg-red-100 p-2 rounded">{error}</p>}
        </form>
    )



    
}