"use server";

import { updatePassword } from '@/lib/action/updatePassword.action';
import React, { useState } from 'react'

function UpdatePassword() {

    const [currentPassword,setCurrentPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState("");

    const updateHandler=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        if(loading) return;

        setLoading(true);
        setError("");

        try{
            const result=await updatePassword({
                currentPassword,
                newPassword,
            });

            if(!result.success){
                throw new Error(result.message || "Unable to update password");
            }
            

        }catch{
            setError("Unable to update password");
        }finally{
            setLoading(false);
        }

    }

  return (
    <div>
        <form onSubmit={updateHandler}>
            <label>Current Password</label>
            <input type='password' placeholder='Enter current password' onChange={(e)=>setCurrentPassword(e.target.value)} value={currentPassword}/>

            <label>New Password</label>
            <input type='password' placeholder='Enter new Password' onChange={(e)=>setNewPassword(e.target.value)} value={newPassword}/>

            <p className='text-sm text-red-500'>{error}</p>

            <div>
                <button type='submit' disabled={loading}>
                    {loading ? "Loading..." : "Update Password"}
                </button>
            </div>
        </form>
    </div>
  )
}

export default UpdatePassword
