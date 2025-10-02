import { fetchUserPosts } from '@/lib/actions/user.actions'
import React from 'react'
import ThreadsCard from './ThreadsCard'

interface Props {
    currentUserId: string
    accountId: string
    accountType: string
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {

    const result = await fetchUserPosts(currentUserId);
  
    return (
    <section className='mt-9 flex flex-col gap-10'>
        {
            result.threads.map((thread: any) => (
                <ThreadsCard 
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accountType === "User"
                        ? { name: result?.name, image: result?.image, id: result?.id }
                        : { name: thread.author.name, image: thread.author.image, id: thread.author.id }
                    }
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                   
                />
            ))
        }
    </section>
  )
}

export default ThreadsTab