"use client"

import { sidebarLinks } from '@/constants';
import { useAuth } from '@clerk/nextjs';
import { getProxiedPluginState } from 'next/dist/build/build-context';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Bottombar = () => {


  const pathname = usePathname();
  const {isLoaded, userId} = useAuth();

  const getRoute = (route: string) => {
    if (route === "/profile" && userId ) return  `/profile/${userId}`;
    return route;
  }

  return (
    <footer className='xl:hidden fixed bottom-0 w-full z-50 bg-black backdrop-blur-lg'>
        <div className='px-4 py-2 flex items-center gap-3 '>
          {
          sidebarLinks.map((element) => {

            const resolvedRoute = getRoute(element.route)
            const isActive =
            // route = "/" | pathname = "/about" 
            //TODO Clear this concept again
            (pathname.includes(resolvedRoute) && resolvedRoute.length > 1) ||
            pathname === resolvedRoute;

            return(
              <Link href={ resolvedRoute } key={ element.label } className={`p-2 flex flex-col justify-center items-center gap-2 w-full rounded-md ${ isActive && "bg-[#877EFF]"}`}>
                  <Image src={element.imgURL} alt='sidebar imgs' width={24} height={24} />
                  <p className='text-white text-sm md:text-lg font-medium max-sm:hidden'> { element.label.split(/\s+/)[0] } </p>
              </Link>
            )
          })
        }  

        </div>
    </footer>
  )
}

export default Bottombar