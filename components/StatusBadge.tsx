import type { ApplicantStatus } from "@/lib/types";

const STYLES: Record<ApplicantStatus, string> = {
  new: "bg-slate-100 text-slate-700",
  shortlisted: "bg-teal/10 text-teal-dark",
  accepted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: { status: ApplicantStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${STYLES[status]}`}>
      {status}
    </span>
  );
}
