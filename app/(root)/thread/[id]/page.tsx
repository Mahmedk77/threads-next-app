import ThreadsCard from '@/components/shared/ThreadsCard';
import { fetchThreadsById } from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Comments from '@/components/forms/Comments'
import React from 'react'

const page = async ({ params }: { params : { id: string } }) => {
  
    const resolvedParams = await params;
    if(!resolvedParams.id) return null;

    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id); ///this is from MONGODB
    if(!userInfo.onboarded) redirect("/onboarding");

    const threads = await fetchThreadsById(resolvedParams.id);

    return (
    <section className='realtive'>
        <div className=''>
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
        <div className='mt-7 '>
            <Comments 
            threadId={threads.id}
            currentUserImg={userInfo.image}
            currentUserId={userInfo._id.toString()} 
            />
        </div>

        <div className='mt-10'>
            
            {
            threads.children.map((comment: any) => (
                <ThreadsCard 
                    key={comment._id}
                    id={comment._id}
                    currentUserId={user.id}
                    parentId={comment.parentId}
                    content={comment.text}
                    author={comment.author}
                    community={comment.community}
                    createdAt={comment.createdAt}
                    comments={comment.children}
                    isComment
                />
                ))
            }
        </div>

    </section>
  )
}

export default page