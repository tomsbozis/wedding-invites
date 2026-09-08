import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { invitation_id, guest_name, attending, guest_count, dietary_notes, message } = body;

  if (!invitation_id || !guest_name || typeof attending !== "boolean") {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { error } = await supabase.from("rsvps").insert({
    invitation_id,
    guest_name,
    attending,
    guest_count: guest_count ?? 1,
    dietary_notes: dietary_notes || null,
    message: message || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Nākamais solis: šeit var pievienot arī rakstīšanu uz Google Sheets
  // caur Google Sheets API, lai pāris redz RSVP arī savā izklājlapā
  // bez nepieciešamības atvērt dashboard.

  return NextResponse.json({ success: true });
}
