import supabase from "@//lib/supabase/supabase-client"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { userId: string } }) {
  if (req.method !== "POST") {
    NextResponse.json({ message: "Method not allowed" }, { status: 405 })
  }

  const reqData = await req.json()

  const { data, error } = await supabase
    .from("folders")
    .select()
    .eq("user_id", params.userId)
    .eq("name", reqData.folder_name)
    .single()

  if (error) return NextResponse.json(error.message, { status: 500 })

  return NextResponse.json(data, { status: 200 })
}