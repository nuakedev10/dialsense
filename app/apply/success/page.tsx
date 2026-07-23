"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import BahoCareFooter from "@/components/BahoCareFooter";

export default function SuccessPage() {
  const [name, setName] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("BahoCare_applicant_name");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads a client-only API; must run post-mount to avoid a server/client mismatch
    if (stored) setName(stored);
  }, []);

  return (
    <>
      <SiteHeader dark />
      <main className="flex-1 flex items-center justify-center bg-slate-900 px-6 py-20 text-center">
        <div className="max-w-md">
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-teal"
          >
            <Check className="h-8 w-8 text-white" strokeWidth={3} />
          </motion.div>

          <h1 className="mt-8 text-2xl sm:text-3xl font-semibold text-white">
            {name ? `Thanks, ${name.split(" ")[0]}.` : "Application received."}
          </h1>
          <p className="mt-4 text-slate-400">
            Your application is in. We read every one carefully — you&apos;ll hear
            back from us within 5 days.
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-lg border border-white/15 px-6 py-3 font-medium text-slate-200 transition-colors hover:border-white/30"
          >
            Back to home
          </Link>
        </div>
      </main>
      <BahoCareFooter />
    </>
  );
}
