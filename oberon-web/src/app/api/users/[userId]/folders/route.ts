import { NextRequest, NextResponse } from "next/server"
import supabase from "@/lib/supabase/supabase-client"

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  const { data: userFeeds, error } = await supabase
    .from("folders")
    .select("*, rss_feeds(*)")
    .eq("user_id", params.userId)
    .order("created_at", { ascending: false })

  if (error) {
    NextResponse.json({ message: error.message })
  }

  return NextResponse.json(userFeeds)
}
