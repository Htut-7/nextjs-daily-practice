"use client";

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Page() {

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const router=useRouter();

    const loginHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError("");

        try{
            const result=await signIn("credentials",{
                email,
                password,
                redirect: false,
            });

            console.log("Auth.js result:", result);

if (!result || result.error) {
  setError(result?.error ?? "No response from authentication");
  return;
}

            router.push('/');
            router.refresh();
            

        }catch{
            setError("Unable to login. Please try again");
        }finally{
            setLoading(false);
        }
    }

  return (
    <div>
      <h2>Login Form</h2>

      <form onSubmit={loginHandler}>
        <label>Email</label>
        <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <label>Password</label>
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
