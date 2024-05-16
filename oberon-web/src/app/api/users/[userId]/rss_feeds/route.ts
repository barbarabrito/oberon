import supabase from "@//lib/supabase/supabase-client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  if (req.method !== "POST") return

  const data = await req.json()

  if (!data.name || !data.url || !params.userId) {
    NextResponse.json(
      {
        message: "Name, URL and User id are required",
      },
      {
        status: 400,
      },
    )
  }

  const { data: feed, error: feedError } = await supabase
    .from("feeds")
    .insert([
      {
        name: data.name,
        url: data.url,
        image_url: data.image_url ?? null,
      },
    ])
    .single()

  if (feedError) {
    NextResponse.json(
      {
        message: "Name, URL and User id are required",
      },
      {
        status: 400,
      },
    )
  }

  NextResponse.json(feed, { status: 201 })
}
