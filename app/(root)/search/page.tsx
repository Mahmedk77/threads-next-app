import UserCard from '@/components/cards/UserCard';
import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  

  const user = await currentUser();
  if(!user) return null;
  
  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect('/onboarding');
 
  //fetch Users
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25
  });

  
  return (
    <section>
      <h1 className='head-text'>Search</h1>
      <div className='mt-14 flex flex-col gap-9'>
        {
          result.users.length == 0 
          ? (
            <p className='text-lg font-semibold text-white tracking-wide'>No users</p>
          )
          : (
            <>
            {
              result.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))
            }
            </>
          ) 
        }
      </div>
    </section>
  )
}

export default page