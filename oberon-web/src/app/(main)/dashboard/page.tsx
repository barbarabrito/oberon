"use client"
import { FeedReader } from "@/components/dashboard/feed-reader"
import useBoundStore from "@/stores/store"
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser-client"
import { useEffect } from "react"

const Dashboard = () => {
  const supabase = createSupabaseBrowserClient()
  const { setUser } = useBoundStore()

  useEffect(() => {
    async function getUserData() {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        console.log(error)
        return
      }

      if (!data.user) return

      setUser({
        id: data.user.id,
        email: data.user.email!,
        created_at: data.user.created_at,
        username: data.user.user_metadata.username,
      })
    }
    getUserData()
  }, [supabase, setUser])

  return <FeedReader />
}
export default Dashboard
