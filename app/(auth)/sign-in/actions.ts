'use server';
import {createAdminClient} from '@/lib/supabase/admin'
import { redirect } from 'next/navigation';

export async function SignInAction(formData: FormData) {
    const supabase = createAdminClient()
    const email= formData.get('email') as string
    const password= formData.get('password') as string
    const {data,error}= await supabase.auth.signInWithPassword({
        email,
        password
    })
    if(error){
        return {success:false,error:error.message}
    }
    redirect('/dashboard')

}

