"use client";

import OAuthButton from '@/components/OAuthButton';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Page() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const router=useRouter();

    const loginHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError("");

        try{
            const result=await signIn("credentials",{
                email,
                password,
                redirect: false,
            });

            console.log("Auth.js result:", result);

if (!result || result.error) {
  setError(result?.error ?? "No response from authentication");
  return;
}

            router.push('/');
            router.refresh();
            

        }catch{
            setError("Unable to login. Please try again");
        }finally{
            setLoading(false);
        }
    }

return (
  <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 text-white">
    {/* Background decoration */}
    <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />

    {/* Login card */}
    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/4 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 ring-1 ring-indigo-400/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-7 w-7 text-indigo-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3 4.5 7.2v5.1c0 4.2 3.2 7.1 7.5 8.7 4.3-1.6 7.5-4.5 7.5-8.7V7.2L12 3Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12 2 2 4-4"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Sign in to continue to your account
        </p>
      </div>

      {/* Login form */}
      <form onSubmit={loginHandler} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-sm font-medium text-slate-200"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-200"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Divider */}
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center">
            <span className="bg-slate-950 px-3 text-xs text-slate-500">
              OR CONTINUE WITH
            </span>
          </div>
        </div>

        {/* OAuth buttons */}
        <div className="flex justify-center">
          <OAuthButton />
        </div>
      </form>

      {/* Footer */}
      <p className="mt-8 text-center text-sm text-slate-400">
        Don&apos;t have an account?{" "}
        <a
          href="/Register"
          className="font-semibold text-indigo-400 transition hover:text-indigo-300"
        >
          Create an account
        </a>
      </p>
    </div>

    <p className="absolute bottom-4 text-xs text-slate-600">
      Secure authentication powered by Auth.js
    </p>
  </main>
);

}

export default Page
