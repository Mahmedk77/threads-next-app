import Image from 'next/image'
import React from 'react'

interface Props {
  accountId: string
  authUserId: string
  name: string
  username: string
  imgUrl: string
  bio: string
}

const ProfileHeader = ({ accountId, authUserId, name, username, imgUrl, bio }: Props) => {
  return (
    <section className='text-white flex flex-col gap-4 justify-start'>
      <div className='flex gap-2'>
        <div className='relative h-20 w-20 object-cover'>
          <Image 
          src={imgUrl} 
          alt='user profile image' 
          fill 
          className='rounded-full object-contain' />
        </div>
        <div className=' flex flex-col justify-center'>
            <h2 className='text-2xl font-semibold '>{name}</h2>
            <p className='text-gray-500 text-base font-medium'>@{username}</p>
        </div>
      </div>
      
      <p className='text-gray-200 mt-6 max-w-lg text-lg tracking-normal font-normal'>{bio}</p>
      <div className='mt-12 h-0.5 w-full bg-neutral-900'/> 
    </section>
  )
}

export default ProfileHeader