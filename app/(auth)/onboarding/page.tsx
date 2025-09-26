"user client"

import AccountProfile from '@/components/forms/AccountProfile'
import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

const page = async () => {

  const user = await currentUser();
  const userInfo = {
    _id: "",
    username: "",
    name: "",
    bio: "",
    image: ""

  };

  const userData = {
    id: user?.id,
    objectId: userInfo?._id || "",
    username: userInfo ? userInfo?.username : user?.username,
    name: userInfo ? userInfo?.name : user?.firstName ?? "", //The ?? operator only falls back on null or undefined.
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user?.imageUrl,
  }


  return (
  <main className='mx-auto flex max-w-3xl flex-col justify-center px-10 py-20 '>
    <h1 className='text-3xl text-white font-semibold'>On boarding</h1>
    <p className='mt-3 text-white'>
      Complete you profile now to use Threads
    </p>
    <section className='mt-9 p-10  bg-[var(--brand-black)]'>
      <AccountProfile user={userData} btnTitle="Continue" />
    </section>
    
  </main>
)
}

export default page