import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {

  const user = await currentUser();
  if (!user) return null;
  
  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding')

  //get Activity (Notifications)
  const activity = await getActivity(userInfo._id);
  console.log(activity)

  return (
    <>
      <h1 className='head-text'>Activity</h1>
      <section className='mt-10 flex flex-col gap-5'>
        {
          activity.length > 0 
          ? (
            <>
            {
              activity.map((activity) => (
                <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                  <article className='w-full flex gap-3 items-center rounded-md r p-4 bg-[var(--brand-black)]'>
                    <Image
                      src={activity.author.image}
                      alt="user_logo"
                      width={32}
                      height={32}
                      className='rounded-full object-cover'
                    />
                    <p className='text-white'>
                      <span className='mr-1 text-[var(--brand-blue-button)]'>
                        {activity.author.name}
                      </span>{" "}
                      replied to your thread
                    </p>
                  </article>
                </Link>
              ))
            }
            </>
          )
          : <p className='text-base text-white'>No activity yet!</p> 
        }
      </section>
    </>
  )
}

export default page