"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import QuestionCard from "@/components/QuestionCard";
import { ASSESSMENT_QUESTIONS } from "@/lib/constants";
import { loadPage1Data, clearPage1Data, type Page1Data } from "@/lib/session-bridge";
import type { ApplicantInput } from "@/lib/types";

type Answers = Record<string, string>;

const TOTAL = ASSESSMENT_QUESTIONS.length;

export default function AssessmentPage() {
  const router = useRouter();
  const [page1, setPage1] = useState<Page1Data | null>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const data = loadPage1Data();
    if (!data) {
      router.replace("/apply");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads sessionStorage (client-only); must run post-mount to avoid a server/client mismatch
    setPage1(data);
    setReady(true);
  }, [router]);

  if (!ready || !page1) {
    return <main className="flex-1 bg-slate-900" />;
  }

  const question = ASSESSMENT_QUESTIONS[index];
  const value = answers[question.id] ?? "";
  const isLast = index === TOTAL - 1;

  function go(next: number) {
    setDirection(next > index ? 1 : -1);
    setError("");
    setIndex(next);
  }

  function handleNext() {
    if (question.required && !value.trim()) {
      setError("This question is required.");
      return;
    }
    if (isLast) {
      handleSubmit();
      return;
    }
    go(index + 1);
  }

  function handleSkip() {
    setError("");
    if (isLast) {
      handleSubmit();
      return;
    }
    go(index + 1);
  }

  async function handleSubmit() {
    setSubmitting(true);
    setError("");

    const payload: ApplicantInput = {
      ...(page1 as Page1Data),
      q1_instinct: answers.q1_instinct ?? "",
      q2_conviction: answers.q2_conviction ?? "",
      q3_learning_style: answers.q3_learning_style ?? "",
      q4_team_frustration: answers.q4_team_frustration ?? "",
      q5_problem_solving: answers.q5_problem_solving ?? "",
      q6_failure_response: answers.q6_failure_response ?? "",
      q7_self_awareness: answers.q7_self_awareness ?? "",
      q8_hospital_observation: answers.q8_hospital_observation ?? "",
      q9_most_alive: answers.q9_most_alive ?? "",
      q10_interesting_system: answers.q10_interesting_system ?? "",
    };

    try {
      const res = await fetch("/api/applicants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Submission failed");
      }
      clearPage1Data();
      sessionStorage.setItem("BahoCare_applicant_name", payload.full_name);
      router.push("/apply/success");
    } catch {
      setError("Something went wrong submitting your application. Please try again.");
      setSubmitting(false);
    }
  }

  const progress = ((index + 1) / TOTAL) * 100;

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <main className="relative flex-1 flex flex-col bg-slate-900 min-h-screen overflow-hidden">
      {question.backgroundImage && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <Image
            src={question.backgroundImage}
            alt=""
            fill
            className="object-cover grayscale"
            priority
          />
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-10">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <Image
            src="/brand/bahocare-wordmark-transparent.png"
            alt="BahoCare"
            width={1668}
            height={499}
            className="h-5 w-auto opacity-90"
          />
          <span>
            Question {index + 1} of {TOTAL}
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-indigo via-teal to-cyan"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={question.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <QuestionCard
              question={question}
              value={value}
              onChange={(v) => setAnswers((a) => ({ ...a, [question.id]: v }))}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-2xl px-6 pb-10">
        {error && <p className="mb-3 text-sm text-danger">{error}</p>}
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-white/30 disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back
          </button>

          <div className="flex items-center gap-3">
            {!question.required && (
              <button
                type="button"
                onClick={handleSkip}
                disabled={submitting}
                className="rounded-lg px-4 py-3 text-sm font-medium text-slate-400 hover:text-slate-200"
              >
                Skip
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
            >
              {isLast ? (submitting ? "Submitting…" : "Submit") : "Next"}
              {!isLast && <ArrowRight className="h-4 w-4" strokeWidth={2} />}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
