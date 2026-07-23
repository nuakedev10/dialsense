"use client";

import { Check } from "lucide-react";
import { ICON_MAP } from "./icon-map";
import type { AssessmentQuestion } from "@/lib/constants";

const MAX_LEN = 600;

export default function QuestionCard({
  question,
  value,
  onChange,
}: {
  question: AssessmentQuestion;
  value: string;
  onChange: (v: string) => void;
}) {
  const Icon = ICON_MAP[question.icon];

  return (
    <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-800/60 backdrop-blur p-8 sm:p-10 shadow-2xl">
      <div className="inline-flex items-center gap-2 rounded-full border border-teal-light/30 bg-teal/10 px-3 py-1 text-xs font-medium text-teal-light">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        {question.badge}
      </div>

      <h2 className="mt-5 text-xl sm:text-2xl font-semibold text-white leading-snug">
        {question.question}
      </h2>

      {question.type === "mcq" ? (
        <div className="mt-7 space-y-3">
          {question.options?.map((option) => {
            const selected = value === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange(option)}
                aria-pressed={selected}
                className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left text-sm sm:text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light ${
                  selected
                    ? "border-teal bg-teal/15 text-white"
                    : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-white/25"
                }`}
              >
                {option}
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-teal bg-teal" : "border-white/25"
                  }`}
                >
                  {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="mt-7">
          <textarea
            rows={4}
            maxLength={MAX_LEN}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={question.placeholder}
            className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light"
          />
          <div className="mt-1.5 text-right text-xs text-slate-500">
            {value.length}/{MAX_LEN}
          </div>
        </div>
      )}
    </div>
  );
}
