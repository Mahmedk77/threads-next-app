import ProfileHeader from '@/components/shared/ProfileHeader';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params: { id: string } }) => {
  
  const resolvedParams = await params;
  console.log("the params are here",resolvedParams.id)
  const user = await currentUser();
  if(!user) return null;
  
  const userInfo = await fetchUser(resolvedParams.id);
  if(!userInfo?.onboarded) redirect('/onboarding');


  
  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-9">
        <Tabs defaultValue='threads' className='w-full ' > 
          <TabsList className='w-full bg-[var(--brand-black)] rounded-sm h-12 '>
            {
              profileTabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.value} className='w-full text-lg text-white rounded-none cursor-pointer bg-black py-2'>
                  <Image  
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                  />

                  <p className='max-sm:hidden ml-4'>{tab.label}</p>
                  {
                   tab.label === "Threads" && (
                    <p className='ml-1 rounded-sm px-2 py-1 bg-gray-600 text-xs'>
                      {userInfo?.threads?.length}
                    </p>
                   ) 
                  }
                </TabsTrigger>
              ))
            }
          </TabsList>
          {
            profileTabs.map((tab) => (
             <TabsContent key={`content-${tab.label}`} 
             value={tab.value}
             className='w-full text-gray-500'>
                <ThreadsTab
                  currentUserId={user.id}
                  accountId={userInfo.id}
                  accountType="User"
                />


             </TabsContent>
            ))
          }
        </Tabs>
      </div>
    </section>
  )
}

export default page