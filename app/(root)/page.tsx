import ThreadsCard from "@/components/cards/ThreadsCard";
import { fetchPosts } from "@/lib/actions/thread.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function Home() {

  const user = await currentUser();
  
  if(!user) return <div className="flex items-center flex-col gap-4 mt-4">
      <h1 className="text-white text-center text-3xl font-bold">Login to explore the latest threads.</h1>
      <Link href={"/onboarding"} className="mt-4 text-xl font-medium p-4 rounded-full 
      px-6 hover:bg-black border border-black hover:border-white bg-[#877EFF] 
      text-white cursor-pointer transition-all duration-150 ">
        Onboard now!
      </Link>
      </div>


  const userInfo = await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect("/onboarding");
  
  const result = await fetchPosts(1, 30);

  return (
  <>
      <h1 className="text-white text-3xl font-bold">
        Home
      </h1>

      <section className="mt-8 flex flex-col gap-4 max-sm:mb-4 max-xl:mb-32">
        {
          result.posts.length === 0 
          ? (
          <p>
            No Threads Found
          </p>
          )
          : (
          <>
           {
            result.posts.map((post) => 
             
             <ThreadsCard 
              key={post._id}
              id={post._id}
              currentUserId={user.id || ""}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
              />
            
            )
           }
          </>
          )
        }
      </section>

    </>
  );


  // console.log(result)
  // console.log(result.posts.community)
 
}
