import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Params {
    id: string,
    currentUserId: string,
    parentId: string | null,
    content: string
    author: {
        name: string,
        image: string,
        id: string,
    },
    community: {
        name: string,
        image: string,
        id: string,
    } | null,
    createdAt: string,
    comments: {
        image: string,
    }[],
    isComment?: boolean
}

const ThreadsCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment
}: Params) => {

  console.log(author);
  return (
  <article className="py-6 px-8 bg-[var(--brand-black)] rounded-md">
    <div className="flex flex-1 gap-4">
        <div className="flex flex-col items-center justify-start">
          
            <Link href={`profile/`} className="h-14 w-14 relative">
              <Image src={author?.image} alt="profile image" fill className="rounded-full aspect-square "/>
            </Link>
          
          <div className="relative mt-2 w-0.5 grow bg-neutral-800 h-14"/>
        </div>

        <div className="flex flex-col flex-1 justify-center">
            <h3 className="text-lg font-semibold text-white">{ author?.name }</h3>
            <p className="text-white text-sm mt-2 mb-4">{ content }</p>
            <div className="flex gap-4 ">
              <Image src={"/heart-gray.svg"} alt="image"  className="cursor-pointer object-contain" width={28} height={28}/>
              <Link href={`/threads/${id}`}>
                <Image src={"/reply.svg"} alt="image" className="cursor-pointer object-contain" width={28} height={28}/>
              </Link>
              <Image src={"/repost.svg"} alt="image" className="cursor-pointer object-contain" width={28} height={28}/>
              <Image src={"/share.svg"} alt="image" className="cursor-pointer object-contain" width={28} height={28}/>
            </div>
        </div>

        { isComment && comments.length > 0 && (
          <Link href={`/threads/${id}`}>
            <p className="mt-1 text-base text-gray-500" >
            { comments.length } replies
            </p>
          </Link>
        )}

    </div>
  </article>
  )
};

export default ThreadsCard;
