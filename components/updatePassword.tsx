"use client";

import { updatePassword } from "@/lib/action/updatePassword.action";
import ROUTES from "@/ROUTES";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UpdatePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router=useRouter();

  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await updatePassword({
        currentPassword,
        newPassword,
      });

      if (!result.success) {
        throw new Error(result.message || "Unable to update password");
      }

      setCurrentPassword("");
      setNewPassword("");
      setSuccess("Password update successfully");

      router.push(ROUTES.HOME);

    } catch {
      setError("Unable to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 border-b border-gray-100 pb-5">
        <h2 className="text-xl font-semibold tracking-tight text-gray-900">
          Change Password
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Update your password to keep your account secure.
        </p>
      </div>

      <form onSubmit={updateHandler} className="space-y-5">
        <div className="space-y-2">
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {success && (
          <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </p>
        )}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <div className="flex justify-end border-t border-gray-100 pt-5">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex min-w-36 items-center justify-center rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePassword;