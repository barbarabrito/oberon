import supabase from "@//lib/supabase/supabase-client"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  if (req.method !== "GET") return

  const { data: userFeeds, error } = await supabase
    .from("folders")
    .select("*, rss_feeds(*)")
    .eq("user_id", params.userId)
    .order("created_at", { ascending: false })

  if (error) {
    NextResponse.json({ message: error.message }, { status: Number(error.code) })
  }

  return NextResponse.json(userFeeds, { status: 200 })
}

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  if (req.method !== "POST") return

  const data = await req.json()

  if (!data.name) {
    NextResponse.json(
      {
        message: "Name is required",
      },
      {
        status: 400,
      },
    )
  }

  if (!params.userId) {
    NextResponse.json(
      {
        message: "User id is required",
      },
      {
        status: 400,
      },
    )
  }

  const { data: folder, error } = await supabase.from("folders").insert([
    {
      name: data.name,
      user_id: params.userId,
    },
  ])

  if (error) {
    NextResponse.json({ message: error.message }, { status: 201 })
  }

  return NextResponse.json(folder, { status: 201 })
}
