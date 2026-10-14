
"use client";

import { Register } from "@/lib/action/register.action";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import OAuthButton from "@/components/OAuthButton";

function Page() {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setError("");

        try {
            const result = await Register({
                username,
                name,
                email,
                password,
            });

            if (!result.success) {
                console.log(result.message);
                throw new Error(result.message);
            }

            router.push("/Login");
            router.refresh();
        } catch {
            setError("Unable to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="text-center text-3xl font-bold text-gray-900">
                    Create Account
                </h1>

                <p className="mb-8 mt-2 text-center text-gray-500">
                    Register to get started
                </p>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Register"}
                    </button>

                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />
                        <span className="text-sm text-gray-400">OR</span>
                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <OAuthButton />
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a
                        href="/Login"
                        className="font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        Sign in
                    </a>
                </p>
            </div>
        </main>
    );
}

export default Page;
