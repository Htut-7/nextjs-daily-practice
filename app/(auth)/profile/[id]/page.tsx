import { GetUserById } from '@/lib/action/getUserById.action'
import React from 'react'
import Link from 'next/link';
import ROUTES from '@/ROUTES';

async function page({params} : {params: Promise<{id: string}>}) {

    const {id}=await params;

    const result=await GetUserById({
        userId: id,
    })

    if(!result.success && !result.data?.user){
        return (
          <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 py-10">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white/80 p-8 text-center shadow-xl shadow-slate-200/60 backdrop-blur">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-rose-50 to-red-100 text-red-500 ring-1 ring-red-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m0 3h.008M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                User not found
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                We couldn&apos;t find the profile you&apos;re looking for.
                Please check the profile link and try again.
              </p>
            </div>
          </main>
        )
    }

    const user=result?.data?.user;

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

     
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Account
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              User Profile
            </h1>
            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              View account details and profile information.
            </p>
          </div>
        </header>

        
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">

     
          <div className="relative h-32 bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 sm:h-44">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-linear-to-t from-slate-900/25 to-transparent" />
            <div className="absolute right-6 top-6 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
              Member Profile
            </div>
          </div>

        
          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-linear-to-br from-indigo-500 to-blue-600 text-3xl font-bold text-white shadow-lg ring-1 ring-slate-200 sm:h-32 sm:w-32 sm:text-4xl">
                  {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>

                <div className="min-w-0 pb-1">
                  <h2 className="wrap-break-word text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {user?.name || 'Unnamed User'}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-indigo-600">
                    @{user?.username || 'username'}
                  </p>
                  <p className="mt-2 break-all text-sm text-slate-500">
                    {user?.email || 'No email provided'}
                  </p>
                </div>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <Link href={ROUTES.EDIT_PROFILE}>Edit Profile</Link>

          </div>
        </section>

        {/* Profile details */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* About section */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                About
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Personal account overview
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email address
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-700">
                    {user?.email || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <span className="text-lg font-semibold">@</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Username
                  </p>
                  <p className="mt-1 wrap-break-word text-sm font-medium text-slate-700">
                    {user?.username || 'Not provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 transition-colors hover:border-slate-200 hover:bg-slate-50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Account status
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-600">
                    Profile available
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Activity section */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recent activity and account updates
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              </div>
            </div>

            <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-linear-to-b from-slate-50 to-white px-6 py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-indigo-500 shadow-sm ring-1 ring-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-800">
                Nothing to show yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                When activity features are connected to your application,
                updates and recent activity can appear here.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-slate-400">
          Profile information is provided by your account.
        </p>
      </div>
    </main>
  )
}

export default page
