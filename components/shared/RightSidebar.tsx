import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const RightSidebar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <div className="text-white px-4 py-6 flex flex-col justify-start items-start max-md:hidden bg-[#111111]">
      <h3 className="font-semibold text-lg">Suggested Users</h3>
      
      <div className="mt-4 flex flex-col gap-2 w-full  ">
        {
        result.users.length === 0 ? (
          <p className="text-lg font-semibold text-white tracking-wide">No users</p>
        ) : (
          <>
            {result.users.map((person) => (
              <Link href={`/profile/${person.id}`}
                key={person.id}
                className="w-full flex justify-between items-center 
                pr-32 py-4 rounded-md pl-2 hover:bg-[#877EFF] cursor-pointer ">

                <div className="flex justify-center items-center gap-2 ">
                  <Image
                    src={person.image}
                    alt="user image"
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                  <div className="ml-2">
                    <h3 className="text-sm font-semibold text-white">
                      {person.name}
                    </h3>
                    <p className="text-slate-100 text-xs font-medium ">
                      @{person.username}
                    </p>
                  </div>
                </div>
                
                
                </Link>

            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RightSidebar;
