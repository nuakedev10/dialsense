"use client";

export default function SkillPill({
  label,
  selected,
  amber,
  onToggle,
}: {
  label: string;
  selected: boolean;
  amber?: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        amber
          ? selected
            ? "border-amber bg-amber text-white focus-visible:ring-amber"
            : "border-amber/40 bg-amber/5 text-amber-700 hover:border-amber/70 focus-visible:ring-amber"
          : selected
            ? "border-teal bg-teal text-white focus-visible:ring-teal"
            : "border-slate-200 bg-white text-slate-600 hover:border-teal/50 focus-visible:ring-teal"
      }`}
    >
      {label}
    </button>
  );
}
