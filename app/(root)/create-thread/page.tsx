import PostThreads from "@/components/forms/PostThreads";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from "next/navigation";

async function page() {
    const user = await currentUser(); //user info from clerk
    console.log("User Data from Clerk", user)

    if(!user) return null;

    const userInfo = await fetchUser(user.id) //fetching user info from mongoDB
    console.log("User Data from MongoDB",userInfo)
    if(!userInfo?.onboarded) redirect('/onboarding'); //checks if the user is onboarded or not
    
    let DB_ID = (userInfo._id).toString(); 
    return(
        <>
            <h1 className="text-white text-3xl font-semibold">
            Create Thread
            </h1>

            <PostThreads userId={DB_ID} />
        </>
    )
}

export default page;