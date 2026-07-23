"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Shield } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(searchParams.get("next") || "/admin");
      router.refresh();
    } else {
      setError("Incorrect password.");
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 flex flex-col items-center justify-center gap-8 bg-slate-900 px-6">
      <Image
        src="/brand/dialsense-wordmark-on-dark.png"
        alt="DialSense"
        width={1087}
        height={217}
        className="h-8 w-auto"
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-slate-800/60 p-8"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/15">
          <Shield className="h-5 w-5 text-teal-light" strokeWidth={2} />
        </div>
        <h1 className="mt-5 text-xl font-semibold text-white">Admin access</h1>
        <p className="mt-1 text-sm text-slate-400">Enter the shared dashboard password.</p>

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-6 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light"
          placeholder="Password"
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-teal py-2.5 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-60"
        >
          {loading ? "Checking…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<main className="flex-1 bg-slate-900" />}>
      <LoginForm />
    </Suspense>
  );
}
