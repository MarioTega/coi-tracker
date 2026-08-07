'use client';
import { useState, useEffect, useRef } from 'react';
import {paymentTiers} from '@/components/payment/paymentTier';
import PaymentGrid from '@/components/payment/PaymentGrid';
import {PaymentGridProps} from '@/components/payment/PaymentGrid';
import addUser from '@/app/payment/action';
import { userData } from '@/app/(auth)/sign-up/page';
import { Router, useRouter } from 'next/router';

export default function Payment({fullName,email,password,companyName,companySize}:userData) {
    const[tier,setTier] = useState<'free' | 'pro' | 'enterprise'>('free');
    const[error,setError]=useState<string>('');
    
    async function handlePayment(){
        //payment portal here
        //if successful
        
        const registeredUser= await addUser({fullName,email,password,companyName,companySize,tier})
        console.log(registeredUser)
        console.log(fullName,companyName)
        if(registeredUser?.status==='failure'){
            setError(registeredUser.error!);
            return

        }
        

        
          
    }

    return(
        <div  className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentTiers.map((tierData:PaymentGridProps,gridIndex:number) => (
            <PaymentGrid
              
                
                key={gridIndex}
                tier={tierData.tier}
                description={tierData.description}
                price={tierData.price}
                isSelected={tierData.tier === tier}
                onSelect={() => {setTier(tierData.tier)}}
            />
        ))}
        <button onClick={handlePayment}>Proceed to Pay</button>
        {error && <p>{error}</p>}
        </div>
    )
}