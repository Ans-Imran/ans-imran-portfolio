"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? "Sign in failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <label htmlFor="pw" className="block text-sm font-medium text-gray-700 mb-1.5">
          Admin password
        </label>
        <input
          id="pw"
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#15803d] focus:ring-2 focus:ring-green-100"
          placeholder="••••••••••"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full bg-[#15803d] text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-[#0f5c2e] transition-colors disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="mb-8 text-center">
        <div className="text-lg font-bold text-[#15803d]">Ans Imran Shahid</div>
        <div className="text-sm text-gray-500">Portfolio admin</div>
      </div>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
