import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import StatusBadge from "@/components/StatusBadge";
import LogoutButton from "@/components/LogoutButton";
import FilterSelect from "@/components/FilterSelect";
import SiteHeader from "@/components/SiteHeader";
import { ROLE_OPTIONS } from "@/lib/constants";
import type { Applicant, ApplicantStatus } from "@/lib/types";

const STATUSES: ApplicantStatus[] = ["new", "shortlisted", "accepted", "rejected"];

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; status?: string; sort?: string; order?: string }>;
}) {
  const params = await searchParams;
  const role = params.role ?? "";
  const status = params.status ?? "";
  const sort = params.sort ?? "created_at";
  const order = params.order ?? "desc";

  const db = supabaseServer();
  let query = db.from("applicants").select("*");
  if (role) query = query.eq("role_applied", role);
  if (status) query = query.eq("status", status);
  query = query.order(sort, { ascending: order === "asc" });

  const { data, error } = await query;
  const applicants = (data ?? []) as Applicant[];

  function buildHref(next: Partial<typeof params>) {
    const merged = { role, status, sort, order, ...next };
    const sp = new URLSearchParams();
    Object.entries(merged).forEach(([k, v]) => v && sp.set(k, v));
    const qs = sp.toString();
    return qs ? `/admin?${qs}` : "/admin";
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Applicants</h1>
            <p className="mt-1 text-sm text-slate-500">{applicants.length} total</p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <FilterSelect
            label="Role"
            value={role}
            items={["", ...ROLE_OPTIONS.map((r) => r.id)].map((v) => ({
              value: v,
              label: v || "All",
              href: buildHref({ role: v }),
            }))}
          />
          <FilterSelect
            label="Status"
            value={status}
            items={["", ...STATUSES].map((v) => ({
              value: v,
              label: v || "All",
              href: buildHref({ status: v }),
            }))}
          />
          <FilterSelect
            label="Sort by"
            value={`${sort}:${order}`}
            items={["created_at:desc", "created_at:asc", "reviewer_score:desc", "reviewer_score:asc"].map(
              (v) => {
                const [field, ord] = v.split(":");
                const fieldLabel = field === "created_at" ? "Date" : "Score";
                return {
                  value: v,
                  label: `${fieldLabel} (${ord === "asc" ? "oldest/lowest" : "newest/highest"} first)`,
                  href: buildHref({ sort: field, order: ord }),
                };
              }
            )}
          />
        </div>

        {error && <p className="mt-6 text-danger">{error.message}</p>}

        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Programme</th>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applicants.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link href={`/admin/${a.id}`} className="font-medium text-teal-dark hover:underline">
                      {a.full_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {a.role_applied === "IoT / Hardware Engineer" ? (
                      <span className="rounded-full bg-amber/15 px-2 py-0.5 text-xs font-medium text-amber-700">
                        {a.role_applied}
                      </span>
                    ) : (
                      a.role_applied
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{a.programme}</td>
                  <td className="px-4 py-3 text-slate-600">{a.year_of_study}</td>
                  <td className="px-4 py-3 text-slate-600">
                    {new Date(a.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">{a.reviewer_score ?? "—"}</td>
                </tr>
              ))}
              {applicants.length === 0 && !error && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    No applicants match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      </main>
    </>
  );
}
