"use client";

import { useRouter } from "next/navigation";

export interface FilterOption {
  value: string;
  label: string;
  href: string;
}

export default function FilterSelect({
  label,
  value,
  items,
}: {
  label: string;
  value: string;
  items: FilterOption[];
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-500">{label}</span>
      <select
        defaultValue={value}
        className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-slate-700"
        onChange={(e) => {
          const item = items.find((i) => i.value === e.target.value);
          if (item) router.push(item.href);
        }}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
