import { darkMode } from '@/tailwind.config'
import { OrganizationSwitcher, SignedIn, SignOutButton, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import Image from 'next/image'
import Link from 'next/link'

const Topbar = () => {
  return (
    <>
      <nav className='flex items-center justify-between p-6 bg-[#111111]'>
        <Link href={'/'} className='flex gap-2 items-center'>
          <Image src={'/logo.svg'} alt='' width={28} height={28}/>
          <p className='text-2xl font-bold max-sm:hidden'>Threads</p>
        </Link>
        <div className='flex gap-4 items-center'>
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
      </nav>
    </>
  )
}

export default Topbar