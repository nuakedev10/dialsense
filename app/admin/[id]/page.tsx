import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { supabaseServer } from "@/lib/supabase-server";
import { ASSESSMENT_QUESTIONS } from "@/lib/constants";
import ScorePanel from "@/components/ScorePanel";
import StatusBadge from "@/components/StatusBadge";
import SiteHeader from "@/components/SiteHeader";
import type { Applicant } from "@/lib/types";

export default async function ApplicantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = supabaseServer();
  const { data, error } = await db.from("applicants").select("*").eq("id", id).single();

  if (error || !data) {
    notFound();
  }

  const applicant = data as Applicant;

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          All applicants
        </Link>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">{applicant.full_name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StatusBadge status={applicant.status} />
              {applicant.role_applied === "IoT / Hardware Engineer" ? (
                <span className="rounded-full bg-amber/15 px-2.5 py-1 text-xs font-medium text-amber-700">
                  {applicant.role_applied}
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                  {applicant.role_applied}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">Personal details</h2>
              <dl className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <Detail label="Email" value={applicant.email} />
                <Detail label="WhatsApp" value={applicant.whatsapp} />
                <Detail label="Programme" value={applicant.programme} />
                <Detail label="Year of study" value={applicant.year_of_study} />
                <Detail label="Nationality" value={applicant.nationality || "—"} />
                <Detail label="Hours/week" value={applicant.hours_per_week} />
                <Detail
                  label="Portfolio"
                  value={
                    applicant.portfolio_url ? (
                      <a
                        href={applicant.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal-dark hover:underline"
                      >
                        {applicant.portfolio_url}
                      </a>
                    ) : (
                      "—"
                    )
                  }
                />
                <Detail label="Submitted" value={new Date(applicant.created_at).toLocaleString()} />
              </dl>

              {applicant.skills?.length > 0 && (
                <div className="mt-4">
                  <span className="text-sm font-medium text-slate-700">Skills</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {applicant.skills.map((s) => (
                      <span key={s} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4">
                <span className="text-sm font-medium text-slate-700">Why this matters to them</span>
                <p className="mt-1 text-sm text-slate-600">{applicant.motivation_sentence}</p>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="font-semibold text-slate-900">Assessment answers</h2>
              <div className="mt-4 space-y-6">
                {ASSESSMENT_QUESTIONS.map((q) => {
                  const answer = applicant[q.id];
                  return (
                    <div key={q.id}>
                      <span className="inline-flex rounded-full bg-teal/10 px-2.5 py-0.5 text-xs font-medium text-teal-dark">
                        {q.badge}
                      </span>
                      <p className="mt-1.5 text-sm font-medium text-slate-800">{q.question}</p>
                      <p className="mt-1 text-sm text-slate-600">{answer || "— no answer —"}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <div>
            <ScorePanel applicant={applicant} />
          </div>
        </div>
      </div>
      </main>
    </>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-slate-800">{value}</dd>
    </div>
  );
}
