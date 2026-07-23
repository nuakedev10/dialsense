"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import type { Applicant, ApplicantStatus } from "@/lib/types";

const STATUSES: ApplicantStatus[] = ["new", "shortlisted", "accepted", "rejected"];

export default function ScorePanel({ applicant }: { applicant: Applicant }) {
  const router = useRouter();
  const [score, setScore] = useState(applicant.reviewer_score ?? 0);
  const [notes, setNotes] = useState(applicant.reviewer_notes ?? "");
  const [status, setStatus] = useState<ApplicantStatus>(applicant.status);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    const res = await fetch(`/api/applicants/${applicant.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewer_score: score || undefined,
        reviewer_notes: notes,
        status,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <h2 className="font-semibold text-slate-900">Evaluation</h2>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700">Score</label>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setScore(n === score ? 0 : n)}
              aria-label={`${n} star`}
              className="p-0.5"
            >
              <Star
                className={`h-6 w-6 ${n <= score ? "fill-amber text-amber" : "text-slate-300"}`}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="status" className="block text-sm font-medium text-slate-700">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ApplicantStatus)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 capitalize"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="notes" className="block text-sm font-medium text-slate-700">
          Notes
        </label>
        <textarea
          id="notes"
          rows={5}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
        />
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-5 w-full rounded-lg bg-teal py-2.5 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
      >
        {saving ? "Saving…" : saved ? "Saved" : "Save evaluation"}
      </button>
    </div>
  );
}
