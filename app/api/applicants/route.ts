import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { ADMIN_COOKIE_NAME, getSessionToken } from "@/lib/admin-auth";
import type { ApplicantInput } from "@/lib/types";

const REQUIRED_FIELDS: (keyof ApplicantInput)[] = [
  "full_name",
  "email",
  "whatsapp",
  "programme",
  "year_of_study",
  "hours_per_week",
  "role_applied",
  "motivation_sentence",
  "q1_instinct",
  "q2_conviction",
  "q3_learning_style",
  "q4_team_frustration",
  "q5_problem_solving",
  "q6_failure_response",
  "q7_self_awareness",
  "q8_hospital_observation",
  "q9_most_alive",
];

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<ApplicantInput>;

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] || (typeof body[field] === "string" && !(body[field] as string).trim())) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  const db = supabaseServer();
  const { data, error } = await db
    .from("applicants")
    .insert({
      full_name: body.full_name,
      email: body.email,
      whatsapp: body.whatsapp,
      programme: body.programme,
      year_of_study: body.year_of_study,
      nationality: body.nationality ?? null,
      hours_per_week: body.hours_per_week,
      portfolio_url: body.portfolio_url ?? null,
      role_applied: body.role_applied,
      skills: body.skills ?? [],
      motivation_sentence: body.motivation_sentence,
      q1_instinct: body.q1_instinct,
      q2_conviction: body.q2_conviction,
      q3_learning_style: body.q3_learning_style,
      q4_team_frustration: body.q4_team_frustration,
      q5_problem_solving: body.q5_problem_solving,
      q6_failure_response: body.q6_failure_response,
      q7_self_awareness: body.q7_self_awareness,
      q8_hospital_observation: body.q8_hospital_observation,
      q9_most_alive: body.q9_most_alive,
      q10_interesting_system: body.q10_interesting_system ?? null,
    })
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const expected = await getSessionToken();
  if (cookie !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const status = searchParams.get("status");
  const sort = searchParams.get("sort") ?? "created_at";
  const order = searchParams.get("order") ?? "desc";

  const db = supabaseServer();
  let query = db.from("applicants").select("*");

  if (role) query = query.eq("role_applied", role);
  if (status) query = query.eq("status", status);

  query = query.order(sort, { ascending: order === "asc" });

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ applicants: data });
}
