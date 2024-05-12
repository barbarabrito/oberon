"use server"

import { revalidatePath } from "next/cache"
import { createSupabaseServerClient } from "../../../../lib/supabase/supabase-server-client"
import { redirect } from "next/navigation"

export async function signUp(formData: FormData) {
  const supabase = createSupabaseServerClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        updated_at: new Date(),
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("ERROR")
    console.log(error)
    return
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}
