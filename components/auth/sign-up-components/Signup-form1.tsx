'use client';
import { useState, useEffect, useRef } from 'react';
interface SignUpForm1Props {
    fullName?: string;
    email?: string;
    password?: string;
    setUserData: React.Dispatch<React.SetStateAction<{
      
    }>>;
}

export default function SignUpForm1({fullName,email,password,setUserData}:SignUpForm1Props){
    return(
         <div>
            <h1>Is forgetting your insurance obligations costing you bills?</h1>
            <h2>Millions of businesses are falling behind on their insurance obligations every year. Losing millions in the process.</h2>
            <h3>Get started today and never miss a deadline again.</h3>
            <input type="text" value={fullName} onChange={(e) =>  setUserData(prev => ({ ...prev, fullName: e.target.value }))} name="fullName" placeholder="Full Name" />
            <input type="email" value={email} onChange={(e) =>  setUserData(prev => ({ ...prev, email: e.target.value }))} name="email" placeholder="Email" />
            <input type="password" value={password} onChange={(e) =>  setUserData(prev => ({ ...prev, password: e.target.value }))} name="password" placeholder="Password" />
           
        </div>

    )
}