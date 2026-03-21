"use client";

import { sidebarLinks } from '@/constants';
import { SignedIn, SignOutButton, useAuth } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LeftSidebar = () => {
  const pathname = usePathname();
  const { isLoaded, userId } = useAuth();

  const getRoute = (route: string) => {
    if (route === '/profile' && userId) return `/profile/${userId}`;
    return route;
  };

  return (
    <section className='px-4 pl-6 flex flex-col justify-between items-center max-xl:hidden bg-[#111111] border-r min-h-screen'>
      <div className='my-6'>
        {sidebarLinks.map((element: any) => {
          const resolvedRoute = getRoute(element.route);

          const isActive =
            (pathname.includes(resolvedRoute) && resolvedRoute.length > 1) ||
            pathname === resolvedRoute;

          return (
            <Link
              href={resolvedRoute}
              key={element.label}
              className={`py-4.5 px-8 flex items-center gap-4 mb-2 w-full rounded-md ${isActive && "bg-[#877EFF]"}`}
            >
              <Image src={element.imgURL} alt='sidebar imgs' width={24} height={24} />
              <p className='text-lg font-semibold text-white'>{element.label}</p>
            </Link>
          );
        })}
      </div>
      <div className='mb-42 pr-12'>
        <SignedIn>
          <SignOutButton redirectUrl='/sign-in'>
            <div className='flex items-center gap-4 cursor-pointer'>
              <Image src={"/logout.svg"} alt='logout icon' width={24} height={24} />
              <p className='text-lg font-medium text-white'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;