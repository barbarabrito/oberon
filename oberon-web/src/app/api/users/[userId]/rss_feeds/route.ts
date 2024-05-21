import { UserFeed } from "@//features/rss-feed/stores/slices/feed-slice"
import supabase from "@//lib/supabase/supabase-client"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  if (req.method !== "POST") {
    NextResponse.json({ message: "Method not allowed" }, { status: 405 })
  }

  const data = await req.json()

  if (!data.name || !data.url || !params.userId || !data.folder_id) {
    return NextResponse.json(
      {
        message: "Name, URL, user ID and folder ID are required",
      },
      {
        status: 400,
      },
    )
  }

  try {
    const { data: feed, error: feedError }: PostgrestSingleResponse<UserFeed> = await supabase
      .from("rss_feeds")
      .insert([
        {
          name: data.name,
          url: data.url,
          image_url: data.image_url ?? null,
          user_id: params.userId,
        },
      ])
      .select()
      .single()

    if (feedError) {
      return NextResponse.json({ status: 500 })
    }

    if (feed) {
      const { error: feedFoldersError } = await supabase
        .from("rss_feed_folders")
        .insert([{ folder_id: data.folder_id, rss_feed_id: feed.id }])

      if (feedFoldersError) {
        return NextResponse.json(feedError, { status: 500 })
      }
    }

    return NextResponse.json(feed, { status: 201 })
  } catch (error) {
    return NextResponse.json({ status: 500 })
  }
}
