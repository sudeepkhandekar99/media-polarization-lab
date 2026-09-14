import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("system_health")
    .select("status, updated_at")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json(
      {
        status: "error",
        database: "unreachable",
        message: error.message,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    status: "ok",
    database: data.status,
    updatedAt: data.updated_at,
  });
}