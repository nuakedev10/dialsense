import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { ADMIN_COOKIE_NAME, getSessionToken } from "@/lib/admin-auth";
import { ASSESSMENT_QUESTIONS } from "@/lib/constants";
import type { Applicant } from "@/lib/types";

function escapeCsv(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function cell(val: unknown): string {
  if (val === null || val === undefined) return "";
  if (Array.isArray(val)) return escapeCsv(val.join("; "));
  return escapeCsv(String(val));
}

const PERSONAL_COLUMNS: { key: keyof Applicant; label: string }[] = [
  { key: "full_name", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "programme", label: "Programme" },
  { key: "year_of_study", label: "Year of Study" },
  { key: "nationality", label: "Nationality" },
  { key: "hours_per_week", label: "Hours/Week" },
  { key: "portfolio_url", label: "Portfolio URL" },
  { key: "role_applied", label: "Role Applied" },
  { key: "skills", label: "Skills" },
  { key: "motivation_sentence", label: "Motivation" },
];

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const expected = await getSessionToken();
  if (cookie !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const status = searchParams.get("status");

  const db = supabaseServer();
  let query = db.from("applicants").select("*").order("created_at", { ascending: false });
  if (role) query = query.eq("role_applied", role);
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const applicants = (data ?? []) as Applicant[];

  const headers = [
    ...PERSONAL_COLUMNS.map((c) => c.label),
    ...ASSESSMENT_QUESTIONS.map((q) => q.badge),
    "Submitted",
    "Status",
    "Reviewer Score",
    "Reviewer Notes",
  ];

  const rows = applicants.map((a) => [
    ...PERSONAL_COLUMNS.map((c) => cell(a[c.key])),
    ...ASSESSMENT_QUESTIONS.map((q) => cell(a[q.id])),
    cell(new Date(a.created_at).toLocaleString("en-GB")),
    cell(a.status),
    cell(a.reviewer_score),
    cell(a.reviewer_notes),
  ]);

  const csv = [headers.map(escapeCsv).join(","), ...rows.map((r) => r.join(","))].join("\n");
  const bom = "﻿";

  return new NextResponse(bom + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dialsense-applicants-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
