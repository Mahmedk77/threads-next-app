import { darkMode } from '@/tailwind.config'
import { OrganizationSwitcher, SignedIn, SignOutButton, UserButton, SignedOut, SignInButton, SignUpButton, } from '@clerk/nextjs'

import { dark } from '@clerk/themes'
import Image from 'next/image'
import Link from 'next/link'

const Topbar = () => {
  return (
    <>
      <nav className='flex items-center justify-between p-6 bg-[#111111] '>
        <Link href={'/'} className='flex gap-2 items-center'>
          <Image src={'/logo.svg'} alt='' width={34} height={34}/>
          <p className='text-2xl font-bold max-sm:hidden text-white'>Threads</p>
        </Link>
        <div className='flex items-center justify-center'>
           <div className='border-2  bg-white rounded-full'>
            <SignedOut >
            <SignInButton> 
                <button className="text-white rounded-full text-sm md:text-md font-medium h-8 sm:h-12 px-2 sm:px-4 cursor-pointer bg-[#111111] hover:bg-[#877EFF]">
                    Sign in
                </button>
            </SignInButton>
                <SignUpButton>
                    <button className="text-black rounded-full text-sm md:text-md font-medium h-8 sm:h-12 px-2 sm:px-4 cursor-pointer hover:text-[#877EFF]">
                        Sign up
                    </button>
                </SignUpButton>
            </SignedOut>
           </div>
          <div className='block md:hidden'>
          <SignedIn>
            <SignOutButton>
              <div className='flex cursor-pointer'>
                <Image src={'/logout.svg'} alt='logout' width={28} height={28}/>
              </div>
            </SignOutButton>
          </SignedIn>
         
          </div>
          <OrganizationSwitcher 
            appearance={{

              theme: dark,
              variables:{
                fontSize: "16px"
              },
              elements: {
                organizationSwitcherTrigger: "py-4 px-6 border border-white"
              },
            }}
          />
        </div>
        {/* <p className='text-white'>Hello World</p> */}
      </nav>
    </>
  )
}

export default Topbar