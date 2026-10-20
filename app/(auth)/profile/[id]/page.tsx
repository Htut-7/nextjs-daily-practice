import { auth } from "@/auth";
import {getUserById} from "@/lib/action/GetUserById.action";
import ROUTES from "@/ROUTES";
import Link from "next/link";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();

  const result = await getUserById({ userId: id });

  if (!result.success || !result.data?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <h1 className="text-xl font-bold text-slate-900">
            User not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            We couldn&apos;t find the profile you&apos;re looking for.
          </p>
        </div>
      </main>
    );
  }

  const user = result.data.user;
  const isOwnProfile = session?.user?.id === id;

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Account
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            User Profile
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            View account details and profile information.
          </p>
        </header>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <div className="h-32 bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-500 sm:h-44" />

          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border-4 border-white bg-linear-to-br from-indigo-500 to-blue-600 text-3xl font-bold text-white shadow-lg sm:h-32 sm:w-32 sm:text-4xl">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="min-w-0 pb-1">
                  <h2 className="wrap-break-word text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {user.name || "Unnamed User"}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-indigo-600">
                    @{user.username || "username"}
                  </p>
                  <p className="mt-2 break-all text-sm text-slate-500">
                    {user.email || "No email provided"}
                  </p>
                </div>
              </div>

              {isOwnProfile && (
                <Link
                  href={ROUTES.EDIT_PROFILE}
                  className="inline-flex w-fit items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-1">
            <h2 className="text-lg font-bold text-slate-900">About</h2>
            <p className="mt-1 text-sm text-slate-500">
              Personal account overview
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email address
                </p>
                <p className="mt-1 break-all text-sm font-medium text-slate-700">
                  {user.email || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Username
                </p>
                <p className="mt-1 wrap-break-word text-sm font-medium text-slate-700">
                  {user.username || "Not provided"}
                </p>
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
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">Activity</h2>
            <p className="mt-1 text-sm text-slate-500">
              Recent activity and account updates
            </p>

            <div className="mt-6 flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center">
              <h3 className="font-semibold text-slate-800">
                Nothing to show yet
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Recent activity will appear here when connected to your
                application&apos;s activity data.
              </p>
            </div>
          </section>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Profile information is provided by your account.
        </p>
      </div>
    </main>
  );
}

export default page;