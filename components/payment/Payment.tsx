'use client';
import { useState, useEffect, useRef } from 'react';
import {paymentTiers} from '@/components/payment/paymentTier';
import PaymentGrid from './PaymentGrid';
import {PaymentGridProps} from '@/components/payment/PaymentGrid';

export default function Payment() {
    const[tier,setTier] = useState<'free' | 'pro' | 'enterprise'>('free');


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
        </div>
    )
}