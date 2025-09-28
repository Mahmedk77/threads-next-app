import ThreadsCard from '@/components/shared/ThreadsCard';
import { fetchThreadsById } from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }: { params : { id: string } }) => {
  
    if(!params.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);
    if(!userInfo.onboarded) redirect("/onboarding");

    const threads = await fetchThreadsById(params.id);

    return (
    <section className='realtive'>
        <div>
            <ThreadsCard 
                key={threads._id}
                id={threads._id}
                currentUserId={user.id}
                parentId={threads.parentId}
                content={threads.text}
                author={threads.author}
                community={threads.community}
                createdAt={threads.createdAt}
                comments={threads.children}
            />
            
        </div>

    </section>
  )
}

export default page