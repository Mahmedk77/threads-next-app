"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  id: string 
  name: string
  username: string
  imgUrl: string
  personType: string
}

const UserCard = ({ id, name, username, imgUrl, personType }: Props) => {
  
  const router = useRouter();
  
  return (
    <article className='w-full flex justify-between items-center px-4'>
      <div className='flex justify-center items-center gap-2'>
        <Image 
          src={imgUrl}
          alt="logo"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div className='ml-2'>
          <h3 className='text-sm font-semibold text-white '>{name}</h3>
          <p className='text-neutral-500 text-xs font-medium'>@{username}</p>
        </div>

      </div>
      <Button 
      onClick={() => router.push(`/profile/${id}`)}
      className='bg-[#877EFF] hover:bg-[#877EFF] 
      cursor-pointer px-6'>
          View
      </Button>
    </article>
  )
}

export default UserCard