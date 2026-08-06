'use client';
import { useState, useEffect, useRef } from 'react';
interface SignupForm2Props {
    companyName?: string;
    companySize?: string;
    setUserData: React.Dispatch<React.SetStateAction<{
       
    }>>;
}
 export default function SignUpForm2({companyName, companySize, setUserData}:SignupForm2Props) {
    return(
        <div>
            <input type="text" value={companyName} onChange={(e) => setUserData(prev => ({ ...prev, companyName: e.target.value }))} placeholder="Company Name" />
            <select name="companyNumber" id="companyNumber" value={companySize} onChange={(e) => setUserData(prev => ({ ...prev, companySize: e.target.value }))}>
                <option value="">Select Company Size</option>
                <option value="lessThan100">Less than a 100</option>
                <option value="100-500">100-500</option>
                <option value="500-1000">500-1000</option>
                <option value="moreThan1000">More than 1000</option>
            </select>
        </div>
    )
 }