import { UserFeed } from "@//features/rss-feed/stores/slices/feed-slice"
import supabase from "@//lib/supabase/supabase-client"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } },
): Promise<NextResponse> {
  if (req.method !== "POST") {
    NextResponse.json({ message: "Method not allowed" }, { status: 405 })
  }

  const reqData = await req.json()

  const { data, error }: PostgrestSingleResponse<UserFeed> = await supabase
    .from("rss_feeds")
    .select()
    .eq("user_id", params.userId)
    .eq("url", reqData.feed_url)
    .single()

  if (error) return NextResponse.json(error.message, { status: 500 })

  return NextResponse.json(data, { status: 200 })
}
