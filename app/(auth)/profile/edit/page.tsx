import { auth } from '@/auth'
import EditProfile from '@/components/EditProfile'
import { GetUserById } from '@/lib/action/GetUserById.action'
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {

    const session=await auth();
    if(!session?.user?.id){
        redirect("/Login");
    }

    const result=await GetUserById({
        userId: session.user.id,
    })

    if(!result.success || !result.data?.user){
        <p className='flex min-h-screen items-center justify-center bg-slate-100 text-lg font font-medium text-slate-500'>
            User not found
        </p>
    }

    const user=result.data?.user;
    
  return (
    <div>
      <EditProfile  
    userId={session.user.id}
      user={{
        name: user?.name ?? "",
        username: user?.username ?? "",
        email: user?.email ?? "",
      }}
      />
    </div>
  )
}

export default page
