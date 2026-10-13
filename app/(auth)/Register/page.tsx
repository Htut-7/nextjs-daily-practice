"use client";

import { Register } from '@/lib/action/register.action';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


function Page() {

    const [username,setUsername]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");
    const router=useRouter();

    const handleRegister=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError("");

        try{
            const result=await Register({
                username,
                name,
                email,
                password,
            });

            if(!result.success){
                console.log(result.message);
                throw new Error(result.message)
            }

            router.push("/login");
            router.refresh();

        }catch{
            setError("Unable to register");
        }finally{
            setLoading(false);
        }

    }

  return (
    <div>
      <h2>Register Form</h2>

      <form onSubmit={handleRegister}>
        <label>Username</label>
        <input type='text' placeholder='Enter your username' onChange={(e)=>setUsername(e.target.value)} value={username}/>

        <label>Name</label>
        <input type='text' placeholder='Enter your name' onChange={(e)=>setName(e.target.value)} value={name}/>

        <label>Email</label>
        <input type='email' placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} value={email}/>

        <label>Password</label>
        <input type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} value={password}/>

        {error && <p className='text-sm text-red-500'>{error}</p>}

        <div>
            <button type='submit' disabled={loading}>
                {loading ? "Loading..." : "Register"}
            </button>
        </div>
      </form>
    </div>
  )
}

export default Page;
