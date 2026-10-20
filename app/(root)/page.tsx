import { auth } from '@/auth'
import Logout from '@/components/Logout';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ROUTES from '@/ROUTES';
import dbConnect from '@/lib/dbConnect';

import React from 'react'
import User from '@/db/user.model';

async function page() {

  const session=await auth();

  if(!session?.user){
    redirect("/Login");
  }

  console.log(session);
  

  await dbConnect();

  const currentUser=await User.findOne({email: session.user.email})
                    .select("name email")
                    .lean();

                    console.log("Session user:", session.user);
console.log("Email used for lookup:", session.user.email);
console.log("MongoDB user found:", currentUser);

 return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white">
      <div className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-indigo-950/30">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-8 sm:px-10">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 text-xl font-bold">
                A
              </div>

             {session.user.id && (
  <Link
    href={ROUTES.PROFILE(session.user.id)}
    className="mt-2 inline-flex items-center gap-2 rounded-lg bg-indigo-500/10 px-3 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20 hover:text-indigo-200"
  >
    View My Profile
    <span aria-hidden="true">→</span>
  </Link>
)}

              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Auth Dashboard
                </h2>
                <p className="text-xs text-slate-400">
                  Your personal space
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Authenticated
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-medium text-indigo-400">
                SIGN IN SUCCESSFUL
              </p>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back!
              </h1>
            </div>

            <div className="shrink-0">
              <Logout />
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            You have successfully signed in. Here are your account details.
          </p>
        </div>

        {/* User Information */}
        <div className="space-y-5 px-6 py-8 sm:px-10">
          <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 transition-colors hover:border-indigo-500/30">
            <p className="text-sm text-slate-400">Full Name</p>
            <p className="mt-2 wrap-break-word text-lg font-semibold text-white">
              {currentUser?.name ?? "not available"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 transition-colors hover:border-indigo-500/30">
            <p className="text-sm text-slate-400">Email Address</p>
            <p className="mt-2 break-all font-semibold text-white">
              {currentUser?.email ?? "not available"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-800/50 p-5 transition-colors hover:border-indigo-500/30">
            <p className="text-sm text-slate-400">User ID</p>
            <p className="mt-2 break-all font-mono text-sm text-sky-300">
              {currentUser?._id.toString()}
            </p>
          </div>

          {/* Session Status */}
          <div className="flex items-center gap-3 rounded-xl bg-emerald-500/5 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <p className="text-sm text-slate-400">
              Your authenticated session is active.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-6 py-4 text-center sm:px-10">
          <p className="text-xs text-slate-500">
            Auth Dashboard · Protected Page
          </p>
        </div>
      </div>
    </main>
  );
}

export default page
