'use client';
import { useState, useEffect, useRef } from 'react';

export default function SignUp() {
    return(
         <div>
            <h1>Sign Up</h1>
            <input type="text" placeholder="Company Name" />
            <select name="companyNumber" id="companyNumber" >
                <option value="">Select Company Size</option>
                <option value="lessThan100">Less than a 100</option>
                <option value="100-500">100-500</option>
                <option value="500-1000">500-1000</option>
                <option value="moreThan1000">More than 1000</option>
            </select>
        </div>

    )
}