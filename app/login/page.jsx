"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(loginAction, null);

  useEffect(() => {
    if (state?.success) {
      router.push("/admin");
    }
  }, [state, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      {/* Login form card */}
      <div className="max-w-md w-full border border-secondary-container bg-surface-container-lowest p-8 rounded-lg shadow-md">
        <h1 className="font-display-lg-mobile text-primary text-center mb-6">Login Admin</h1>
        <form action={action} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-label-md text-secondary mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full px-4 py-2 border border-secondary-container rounded focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-label-md text-secondary mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-secondary-container rounded focus:outline-none focus:border-primary text-sm"
            />
          </div>
          {state?.error && (
            <p className="text-error text-xs font-label-md text-center">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary text-white py-2 rounded font-label-md text-sm hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}
