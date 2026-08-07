'use server';
import { createClient } from "@/lib/supabase/server";
import { userData } from "../(auth)/sign-up/page";
import { redirect } from "next/navigation";

export default async function addUser({fullName,email,password,companyName,companySize,tier}:userData){
    try{
        const supabase= await createClient();
        const {data:admin,error}= await supabase.auth.signUp({
            email,
            password
        });
        
        if (error) throw error;
        
        if (admin.user) {
            const {data:orgData,error:insertOrgError}=await supabase.from('organizations').insert({
                name:companyName,
                subscription_tier:tier
            }).select();
            if(insertOrgError) throw insertOrgError;

            const org = Array.isArray(orgData) ? orgData[0] : orgData;
            if (!org || !org.id) throw new Error('Failed to create organization or missing id');

            const{data:orgMemberData,error:insertOrgMemberError}=await supabase.from('organization_members').insert({
                organization_id: org.id,
                user_id:admin.user.id,
                role_text: 'admin',

            });
            if(insertOrgMemberError) throw insertOrgMemberError;
            
        
            
        }
    }catch(err: unknown){
        if(err instanceof Error){
            return{
                status:'failure',
                error: err.message
            }

        }
        return{
            status:'failure',
            error: `Something Went Wrong Signing You Up. Don't Fret, Try Again!`
        }

    }
    redirect('/dashboard');
    

}