"use server"
import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../../../../lib/supabase/supabase-server-client"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  if (error) {
    console.log(error)
    return
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}
