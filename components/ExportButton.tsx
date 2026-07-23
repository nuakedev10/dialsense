"use client";

import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function ExportButton() {
  const searchParams = useSearchParams();

  function handleExport() {
    const params = new URLSearchParams();
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    if (role) params.set("role", role);
    if (status) params.set("status", status);
    const qs = params.toString();
    const url = qs ? `/api/applicants/export?${qs}` : "/api/applicants/export";
    window.open(url, "_blank");
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
    >
      <Download className="h-4 w-4" strokeWidth={2} />
      Export CSV
    </button>
  );
}
