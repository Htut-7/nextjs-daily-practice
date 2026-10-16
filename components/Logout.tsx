"use client";

import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
  return (
    <div className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900">
      <button type='button' onClick={()=>signOut({callbackUrl: "/Login"})}>Logout</button>
    </div>
  )
}

export default Logout
