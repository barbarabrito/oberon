import supabase from "@//lib/supabase/supabase-client"
import { PostgrestError } from "@supabase/supabase-js"
import { error } from "console"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  if (req.method !== "POST") return

  const data = await req.json()

  if (!data.name || !data.url || !params.userId || !data.folder_id) {
    NextResponse.json(
      {
        message: "Name, URL, user ID and folder ID are required",
      },
      {
        status: 400,
      },
    )
  }

  const {
    data: feed,
    error: feedError,
  }: {
    data: {
      id: number
      name: string
      url: string
      image_url: string
      created_at: string
      updated_at: string
    } | null
    error: PostgrestError | null
  } = await supabase
    .from("rss_feeds")
    .insert([
      {
        name: data.name,
        url: data.url,
        image_url: data.image_url ?? null,
      },
    ])
    .single()

  if (feedError) {
    NextResponse.json({ message: error }, { status: Number(feedError.code) })
  }

  if (feed) {
    const { error: feedFoldersError } = await supabase
      .from("rss_feed_folders")
      .insert([{ rss_feed_id: feed.id, folder_id: data.folder_id, user_id: params.userId }])

    if (feedFoldersError) {
      throw feedFoldersError
    }
  }

  NextResponse.json(feed, { status: 201 })
}
