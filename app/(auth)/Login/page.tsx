"use client";

import React, { useState } from 'react'

function Page() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const loginHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError("");

        try{

        }catch{
            
        }

    }

  return (
    <div>
      <h2>Login Form</h2>

      <form onSubmit={loginHandler}>
        <label>Email</label>
        <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <label>Passowrd</label>
        <input type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}value={password}/>

        {error && <p className='text-sm text-red-500'>{error}</p>}

        <div>
            <button type='submit' disabled={loading}>
                {loading ? "Loading..." : "Login"}
            </button>
        </div>
      </form>
    </div>
  )
}

export default Page
