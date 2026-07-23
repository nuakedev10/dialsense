"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { RoleOption } from "@/lib/constants";

export default function RoleCard({
  role,
  selected,
  onSelect,
}: {
  role: RoleOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const amber = role.amber;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      aria-pressed={selected}
      className={`relative flex flex-col text-left rounded-2xl border-2 p-5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        selected
          ? amber
            ? "border-amber bg-amber/5 focus-visible:ring-amber"
            : "border-teal bg-teal/5 focus-visible:ring-teal"
          : amber
            ? "border-amber/40 bg-amber/[0.03] hover:border-amber/70 focus-visible:ring-amber"
            : "border-slate-200 bg-white hover:border-teal/50 focus-visible:ring-teal"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{role.title}</h3>
        {role.badge && (
          <span className="shrink-0 rounded-full bg-amber px-2.5 py-0.5 text-xs font-semibold text-white">
            {role.badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-slate-600">{role.description}</p>

      <span
        className={`absolute top-4 right-4 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
          selected
            ? amber
              ? "border-amber bg-amber"
              : "border-teal bg-teal"
            : "border-slate-300 bg-white"
        } ${role.badge ? "top-11" : "top-4"}`}
      >
        {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
      </span>
    </motion.button>
  );
}
