"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import RoleCard from "@/components/RoleCard";
import SkillPill from "@/components/SkillPill";
import SiteHeader from "@/components/SiteHeader";
import { ROLE_OPTIONS, PROGRAMME_OPTIONS, HOURS_OPTIONS, SKILL_OPTIONS } from "@/lib/constants";
import { savePage1Data } from "@/lib/session-bridge";
import type { RoleApplied } from "@/lib/types";

const YEAR_OPTIONS = ["Year 1", "Year 2", "Year 3", "Year 4", "Graduate"];

interface FormState {
  full_name: string;
  email: string;
  whatsapp: string;
  programme: string;
  year_of_study: string;
  nationality: string;
  hours_per_week: string;
  portfolio_url: string;
  motivation_sentence: string;
}

const EMPTY_FORM: FormState = {
  full_name: "",
  email: "",
  whatsapp: "",
  programme: "",
  year_of_study: "",
  nationality: "",
  hours_per_week: "",
  portfolio_url: "",
  motivation_sentence: "",
};

export default function ApplyPage() {
  const router = useRouter();
  const [role, setRole] = useState<RoleApplied | null>(null);
  const [skills, setSkills] = useState<string[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleSkill(label: string) {
    setSkills((s) => (s.includes(label) ? s.filter((x) => x !== label) : [...s, label]));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!role) next.role = "Select a role to continue.";
    if (!form.full_name.trim()) next.full_name = "Full name is required.";
    if (!form.email.trim()) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Enter a valid email address.";
    }
    if (!form.whatsapp.trim()) next.whatsapp = "WhatsApp number is required.";
    if (!form.programme) next.programme = "Select your programme.";
    if (!form.year_of_study) next.year_of_study = "Select your year of study.";
    if (!form.hours_per_week) next.hours_per_week = "Select your availability.";
    if (!form.motivation_sentence.trim()) {
      next.motivation_sentence = "This field is required.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      const firstErrorId = Object.keys(errors)[0];
      document.getElementById(firstErrorId ?? "")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    savePage1Data({
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      whatsapp: form.whatsapp.trim(),
      programme: form.programme,
      year_of_study: form.year_of_study,
      nationality: form.nationality.trim(),
      hours_per_week: form.hours_per_week,
      portfolio_url: form.portfolio_url.trim(),
      role_applied: role as RoleApplied,
      skills,
      motivation_sentence: form.motivation_sentence.trim(),
    });

    router.push("/apply/assessment");
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-slate-900">Apply to BahoCare</h1>
        <p className="mt-2 text-slate-600">
          Choose a role, tell us who you are, and move on to a short reasoning
          assessment. This takes about 10 minutes.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-12">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Which role fits you?</h2>
            {errors.role && <p className="mt-1 text-sm text-danger">{errors.role}</p>}
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {ROLE_OPTIONS.map((r) => (
                <RoleCard
                  key={r.id}
                  role={r}
                  selected={role === r.id}
                  onSelect={() => {
                    setRole(r.id);
                    setErrors((e) => ({ ...e, role: "" }));
                  }}
                />
              ))}
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            <Field
              id="full_name"
              label="Full name"
              error={errors.full_name}
              value={form.full_name}
              onChange={(v) => update("full_name", v)}
            />
            <Field
              id="email"
              label="Email"
              type="email"
              error={errors.email}
              value={form.email}
              onChange={(v) => update("email", v)}
            />
            <Field
              id="whatsapp"
              label="WhatsApp number"
              error={errors.whatsapp}
              value={form.whatsapp}
              onChange={(v) => update("whatsapp", v)}
            />
            <SelectField
              id="programme"
              label="Programme"
              error={errors.programme}
              value={form.programme}
              options={PROGRAMME_OPTIONS}
              onChange={(v) => update("programme", v)}
            />
            <SelectField
              id="year_of_study"
              label="Year of study"
              error={errors.year_of_study}
              value={form.year_of_study}
              options={YEAR_OPTIONS}
              onChange={(v) => update("year_of_study", v)}
            />
            <Field
              id="nationality"
              label="Nationality"
              optional
              value={form.nationality}
              onChange={(v) => update("nationality", v)}
            />
            <SelectField
              id="hours_per_week"
              label="Hours/week availability"
              error={errors.hours_per_week}
              value={form.hours_per_week}
              options={HOURS_OPTIONS}
              onChange={(v) => update("hours_per_week", v)}
            />
            <Field
              id="portfolio_url"
              label="LinkedIn / GitHub"
              optional
              value={form.portfolio_url}
              onChange={(v) => update("portfolio_url", v)}
            />
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Skills</h2>
            <p className="mt-1 text-sm text-slate-500">Select all that apply.</p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {SKILL_OPTIONS.map((s) => (
                <SkillPill
                  key={s.label}
                  label={s.label}
                  amber={s.amber}
                  selected={skills.includes(s.label)}
                  onToggle={() => toggleSkill(s.label)}
                />
              ))}
            </div>
          </section>

          <section>
            <label htmlFor="motivation_sentence" className="block text-lg font-semibold text-slate-900">
              In one sentence, why does this work matter to you?
            </label>
            <textarea
              id="motivation_sentence"
              rows={2}
              value={form.motivation_sentence}
              onChange={(e) => update("motivation_sentence", e.target.value)}
              className={`mt-3 w-full rounded-lg border px-4 py-3 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
                errors.motivation_sentence ? "border-danger" : "border-slate-300"
              }`}
            />
            {errors.motivation_sentence && (
              <p className="mt-1 text-sm text-danger">{errors.motivation_sentence}</p>
            )}
          </section>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3.5 font-medium text-white transition-colors hover:bg-teal-dark"
          >
            Continue to assessment
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </form>
      </div>
      </main>
    </>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  optional,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  optional?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label} {optional && <span className="text-slate-400 font-normal">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-lg border px-4 py-2.5 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
          error ? "border-danger" : "border-slate-300"
        }`}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
  error,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-1.5 w-full rounded-lg border bg-white px-4 py-2.5 text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal ${
          error ? "border-danger" : "border-slate-300"
        }`}
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}
