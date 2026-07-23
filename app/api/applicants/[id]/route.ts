import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { ADMIN_COOKIE_NAME, getSessionToken } from "@/lib/admin-auth";

async function requireAdmin(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const expected = await getSessionToken();
  return cookie === expected;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;

  const db = supabaseServer();
  const { data, error } = await db
    .from("applicants")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ applicant: data });
}

const ALLOWED_STATUSES = ["new", "shortlisted", "rejected", "accepted"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = await request.json();

  const update: Record<string, unknown> = {};

  if (body.reviewer_score !== undefined) {
    const score = Number(body.reviewer_score);
    if (!Number.isInteger(score) || score < 1 || score > 5) {
      return NextResponse.json({ error: "reviewer_score must be 1-5" }, { status: 400 });
    }
    update.reviewer_score = score;
  }
  if (body.reviewer_notes !== undefined) {
    update.reviewer_notes = body.reviewer_notes;
  }
  if (body.status !== undefined) {
    if (!ALLOWED_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    update.status = body.status;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 400 });
  }

  const db = supabaseServer();
  const { data, error } = await db
    .from("applicants")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ applicant: data });
}
