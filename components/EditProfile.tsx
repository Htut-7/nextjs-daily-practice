"use client";

import { UpdateProfile } from '@/lib/action/updateProfile.action';
import ROUTES from '@/ROUTES';
import { useRouter } from 'next/navigation';
<<<<<<< HEAD
import React, { useState } from 'react'
=======
import React, { useState } from 'react';
>>>>>>> day-04-profile-management

export interface userProfile{
    username: string,
    name: string,
    email: string,
}

<<<<<<< HEAD
function EditProfile({ userId,user} : {
    user: userProfile,
    userId: string,
}) {

    const [username,setUsername]=useState(user.username);
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(""); 
=======
function EditProfile({userId, user} : {
    userId: string;
    user: userProfile;
}) {

    const [name,setName]=useState(user.name);
    const [username,setUsername]=useState(user.username);
    const [email,setEmail]=useState(user.email);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
>>>>>>> day-04-profile-management
    const router=useRouter();

    const updateHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError("");

        try{
            const result=await UpdateProfile({
<<<<<<< HEAD
                username,
                name,
                email,
            });

            if(!result.success){
                throw new Error(result.message || "Failed to update profile");
            }
            router.refresh();
            router.push(ROUTES.PROFILE(userId));
        }catch{
            setError("Failed to update profile");
        }finally{
            setLoading(false);
        }

    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <form
        onSubmit={updateHandler}
        className="w-full max-w-lg space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 sm:p-10"
      >
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-600">
            <span>✎</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Edit Profile
          </h2>
          <p className="text-sm text-slate-500">
            Update your personal information below.
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={(e)=>setName(e.target.value)}
            value={name}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <div className="space-y-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Update Profile"}
          </button>

          <p className="text-center text-xs text-slate-400">
            Keep your profile information accurate and up to date.
          </p>
        </div>
      </form>
    </div>
  )
}

export default EditProfile
=======
            username,
            name,
            email,
        });

        if(!result.success){
            throw new Error(result.message || "Profile update failed")
        }

        router.refresh();
        router.push(ROUTES.PROFILE(userId))

        }catch{
            setError("Unable to update profile");
        }finally{
            setLoading(false);
        }
    }

  return (
  <main className="min-h-screen bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl">

      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">
          Account Settings
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Edit Profile
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
          Update your personal information and keep your account details up to date.
        </p>
      </div>

 
      <form
        onSubmit={updateHandler}
        className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-indigo-950/20"
      >
     
        <div className="border-b border-white/10 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-xl font-bold text-indigo-300 ring-1 ring-indigo-400/20">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Manage your profile details below.
              </p>
            </div>
          </div>
        </div>


        <div className="space-y-6 px-6 py-8 sm:px-8">

          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
            />
            <p className="mt-2 text-xs text-slate-500">
              Your unique username identifies your account.
            </p>
          </div>


          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>


          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full rounded-xl border border-white/10 bg-slate-800/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 hover:border-white/20 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>


          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mt-0.5 h-5 w-5 shrink-0 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 4h.01M10.3 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
                />
              </svg>
              <p className="text-sm leading-5 text-red-300">{error}</p>
            </div>
          )}
        </div>

  
        <div className="flex flex-col-reverse gap-3 border-t border-white/10 bg-slate-950/40 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
          <button
            type="button"
            disabled={loading}
            onClick={() => router.push(ROUTES.PROFILE(userId))}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4Z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>

      
      <p className="mt-6 text-center text-xs leading-5 text-slate-500">
        Your profile information is associated with your account.
      </p>
    </div>
  </main>
)
}

export default EditProfile
>>>>>>> day-04-profile-management
