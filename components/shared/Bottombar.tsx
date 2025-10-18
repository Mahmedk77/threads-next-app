"use client"

import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const Bottombar = () => {


  const pathname = usePathname();

  return (
    <footer className='md:hidden fixed bottom-0 w-full z-50 bg-black backdrop-blur-lg'>
        <div className='px-4 py-2 flex items-center gap-3 '>
          {
          sidebarLinks.map((element) => {
            const isActive =
            // route = "/" | pathname = "/about" 
            //TODO Clear this concept again
            (pathname.includes(element.route) && element.route.length > 1) ||
            pathname === element.route;
            return(
              <Link href={ element.route } key={ element.label } className={`p-2 flex flex-col justify-center items-center gap-2 w-full rounded-md ${ isActive && "bg-[#877EFF]"}`}>
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