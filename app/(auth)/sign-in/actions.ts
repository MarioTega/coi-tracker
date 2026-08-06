'use server';
import {createAdminClient} from '@/lib/supabase/admin'

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
    return {success:true,data}

}

