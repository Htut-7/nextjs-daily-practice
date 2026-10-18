import { auth } from "@/auth";
import { GetUserById } from "@/lib/action/GetUserById.action";
import ROUTES from "@/ROUTES";
import React from "react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const result = await GetUserById({
    userId: id,
  });

  if (!result.success || !result.data?.user) {
    throw new Error(result.message || "User not found");
  }

  const user = result.data?.user;
  const isOwnProfile = session?.user?.id === id;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Profile Header */}
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="h-40 bg-linear-to-r from-blue-600 via-indigo-500 to-violet-500 sm:h-52" />

          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl border-4 border-white bg-slate-100 text-4xl font-bold text-slate-600 shadow-md sm:h-32 sm:w-32">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="space-y-1 pb-1">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {user?.name || "User"}
                  </h1>
                  <p className="text-sm font-medium text-slate-500">
                    @{user?.username || "username"}
                  </p>
                  <p className="text-sm text-slate-500">
                    {user?.email || "No email available"}
                  </p>
                </div>
              </div>

              {isOwnProfile && (
                <a
                  href={ROUTES.EDIT_PROFILE}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                >
                  Edit Profile
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Profile Information */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900">
              About
            </h2>

           

            <div className="border-t border-slate-100 pt-5">
              <h3 className="mb-4 text-sm font-semibold text-slate-900">
                Account information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <span aria-hidden="true">✉</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-400">Email address</p>
                    <p className="break-all text-sm font-medium text-slate-700">
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <span aria-hidden="true">@</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Username</p>
                    <p className="text-sm font-medium text-slate-700">
                      {user?.username || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <span aria-hidden="true">✓</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Profile status</p>
                    <p className="text-sm font-medium text-slate-700">
                      Active profile
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Section */}
          <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Activity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Posts and activity from this account
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Profile
              </span>
            </div>

            <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                <span aria-hidden="true">▤</span>
              </div>
              <h3 className="font-semibold text-slate-800">
                No activity to display
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Posts and other public activity can appear here when connected
                to your application&apos;s activity data.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default page;