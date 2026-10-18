import { auth } from "@/auth";
import Logout from "@/components/Logout";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";
import ROUTES from "@/ROUTES";

async function page() {
  const session = await auth();

  if (!session?.user) {
    redirect("/Login");
  }

  const userId = session.user.id as string;

  console.log("Session user ID:", session.user.id);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-indigo-950/30">
        {/* Decorative Header Background */}
        <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 via-blue-500 to-violet-500" />

        {/* Header */}
        <header className="border-b border-white/10 px-6 py-8 sm:px-10 sm:py-9">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500 text-xl font-bold shadow-lg shadow-indigo-950/40">
                A
              </div>

              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Auth Dashboard
                </h2>
                <p className="text-sm text-slate-400">
                  Your personal space
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Authenticated
            </span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.2em] text-indigo-400">
                SIGN IN SUCCESSFUL
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back!
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                You&apos;re signed in successfully. Manage your profile and view
                your account information below.
              </p>
            </div>

            <div className="shrink-0">
              <Logout />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-9">
          {/* Profile Navigation */}
          <section>
            <Link
              href={ROUTES.PROFILE(userId)}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-indigo-400/20 bg-linear-to-r from-indigo-500/15 to-violet-500/10 p-5 transition duration-200 hover:border-indigo-400/50 hover:from-indigo-500/20 hover:to-violet-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 sm:p-6"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500 text-xl shadow-lg shadow-indigo-950/30 transition-transform group-hover:scale-105">
                  <span aria-hidden="true">👤</span>
                </div>

                <div className="min-w-0">
                  <h3 className="font-semibold text-white">
                    View My Profile
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-slate-400">
                    View your personal information and activity
                  </p>
                </div>
              </div>

              <span className="shrink-0 text-xl text-indigo-400 transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </section>

          {/* User Information */}
          <section>
            <div className="mb-4">
              <h2 className="text-lg font-bold text-white">
                Account Information
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Details associated with your current session
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 transition-colors hover:border-indigo-500/30">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-indigo-400" aria-hidden="true">
                    ◉
                  </span>
                  <p className="text-sm text-slate-400">Full Name</p>
                </div>

                <p className="wrap-break-word text-base font-semibold text-white">
                  {session.user.name ?? "not available"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 transition-colors hover:border-indigo-500/30">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-indigo-400" aria-hidden="true">
                    ✉
                  </span>
                  <p className="text-sm text-slate-400">Email Address</p>
                </div>

                <p className="break-all text-base font-semibold text-white">
                  {session.user.email ?? "not available"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 transition-colors hover:border-indigo-500/30 sm:col-span-2">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-sky-400" aria-hidden="true">
                    #
                  </span>
                  <p className="text-sm text-slate-400">User ID</p>
                </div>

                <p className="break-all font-mono text-sm leading-6 text-sky-300">
                  {session.user.id}
                </p>
              </div>
            </div>
          </section>

          {/* Session Status */}
          <section className="flex items-start gap-3 rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
              <span className="text-sm text-emerald-400" aria-hidden="true">
                ✓
              </span>
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-300">
                Session Active
              </p>
              <p className="mt-1 text-sm leading-5 text-slate-400">
                Your authenticated session is active, and this protected page
                is available to you.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-slate-950/30 px-6 py-5 text-center sm:px-10">
          <p className="text-xs text-slate-500">
            Auth Dashboard <span className="mx-1.5">·</span> Protected Page
          </p>
        </footer>
      </div>
    </main>
  );
}

export default page;