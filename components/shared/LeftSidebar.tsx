"use client";

import { sidebarLinks } from '@/constants';
import { SignedIn, SignOutButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const LeftSidebar = () => {

  const router = useRouter();
  const pathname = usePathname(); 

  const [isActive, setIsActive] = useState(false);




  return (
    <section className='px-4 pl-6 flex flex-col justify-between items-center max-md:hidden bg-[#111111]'>
      <div className='my-6'>
        {
          sidebarLinks.map((element) => {
            const isActive =
            // route = "/" | pathname = "/about" 
            //TODO Clear this concept again
            (pathname.includes(element.route) && element.route.length > 1) ||
            pathname === element.route;
            return(
              <Link href={ element.route } key={ element.label } className={`py-4.5 px-8 flex items-center gap-4 mb-2 w-full  rounded-md ${ isActive && "bg-[#877EFF]"}`}>
                  <Image src={element.imgURL} alt='sidebar imgs' width={24} height={24} />
                  <p className='text-lg font-semibold'> { element.label } </p>
              </Link>
            )
          })
        }
      </div>
      <div className='mb-24 pr-12 '> 
        <SignedIn>
          <SignOutButton redirectUrl='/sign-in'>
            <div className='flex items-center gap-4 cursor-pointer'>
            <Image src={"/logout.svg"} alt='logout icon' width={24} height={24} />
            <p className='text-lg font-medium'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
      
    </section>
  )
}

export default LeftSidebar