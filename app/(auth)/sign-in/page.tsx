'use client';
import { useState, useEffect, useRef } from 'react';
import SignInForm from '@/components/auth/Signin-form';
import Link from 'next/link';


export default function SignIn(){
    return(
        <div>
         <h1>Welcome Back!</h1>
        <SignInForm />
        <p>Don't have an account? <Link href="/sign-up">Sign up here</Link></p>
        </div>

    )
}