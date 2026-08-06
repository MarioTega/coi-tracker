'use client';

import { useState } from "react";


export interface PaymentGridProps {
    tier: 'free' | 'pro' | 'enterprise';
    description: string;
    price: string;
    isSelected?: boolean;
    onSelect?: () => void;
    
    
    
}
export default function PaymentGrid({ tier, description, price, isSelected, onSelect }: PaymentGridProps) {
    
    
   
    return (
        <div onClick={onSelect}  className={`border rounded-lg p-4 ${isSelected ? 'border-blue-500' : ''}`}>
            
            <h2  className="text-xl font-bold">{tier}</h2>
            <p>{description}</p>
            <p className="text-lg font-semibold">{price}</p>
            
        </div>
    )

}