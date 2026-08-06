'use client';
import Link from "next/link";
import { useState } from "react";

interface NavigateSignupProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
const buttons={
    lastpage: 'Go to Payment',
    nextpage: 'Next',
    previouspage: 'Previous',
    firstPage:'Get started'
}
export default function NavigateSignup({page,setPage}:NavigateSignupProps){
    
    return(
        <div className="flex justify-between">
            
              <button  onClick={() => setPage(page - 1)} disabled={page === 1} className={` ${page === 1 ? 'invisible' : ''}`}>
                {buttons.previouspage}
              </button>
        
              <button onClick={() => setPage(page + 1)}  className={` ${page === 1 ? 'visible' : 'invisible'}`}>
                {buttons.firstPage}
              </button>
              <button onClick={() => setPage(page + 1)}  disabled={page === 3} className={` ${page === 3 || page === 1 ? 'invisible' : ''}`}>
                {buttons.nextpage}
              </button>
              <Link href="/payment" className={` ${page === 3 ? 'visible' : 'invisible'}`}>
                {buttons.lastpage}
              </Link>
            

        </div>
    )

}