import { auth } from '@/auth';
import UpdatePassword from '@/components/updatePassword'
import ROUTES from '@/ROUTES';
import { redirect } from 'next/navigation';
import React from 'react'

async function page() {

    const session=await auth();

    if(!session?.user?.id){
        redirect(ROUTES.LOGIN);
    }
    

  return (
    <div>
      <UpdatePassword />
    </div>
  )
}

export default page
