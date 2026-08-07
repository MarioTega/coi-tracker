'use client'
import { useState,useEffect,useRef, SetStateAction } from 'react'
import SignUpForm1 from '@/components/auth/sign-up-components/Signup-form1'
import Link from 'next/link'
import NavigateSignup from '@/components/auth/sign-up-components/Navigate-signup'
import SignUpForm2 from '@/components/auth/sign-up-components/Signup-form2'


export interface userData {
    fullName: string;
    email: string;
    password: string;
    companyName: string;
    companySize: string;
    tier:string;
    setUserData?: React.Dispatch<SetStateAction<userData>>
}
export default function SignUp(){
    const[page,setPage] = useState<number>(1);
    const[userData,setUserData] = useState<userData>({
        fullName: '',
        email: '',
        password: '',
        companyName: '',
        companySize: '',
        tier: 'free'

    });
    return(
        <div>
        {page===1 && (
            <div>
            <h1>Welcome to CertTracker</h1>
            <h2>Never fall behind on your insurance obligations again!</h2>
            <p>Already have an account? <Link href="/sign-in">Sign in here</Link></p>
            </div>
        )}
        {page===2 && (
            <SignUpForm1  fullName={userData.fullName} email={userData.email} password={userData.password} setUserData={setUserData} />
        )}
        {page===3 && (
            <SignUpForm2 companyName={userData.companyName} companySize={userData.companySize} setUserData={setUserData} />
        )}
        <NavigateSignup
         page={page}
         setPage={setPage}
         />
        </div>
    )
}