"use client";

import { UpdateProfile } from '@/lib/action/updateProfile.action';
import ROUTES from '@/ROUTES';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export interface userProfile{
    username: string,
    name: string,
    email: string,
}

function EditProfile({ userId,user} : {
    user: userProfile,
    userId: string,
}) {

    const [username,setUsername]=useState(user.username);
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(""); 
    const router=useRouter();

    const updateHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError("");

        try{
            const result=await UpdateProfile({
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
