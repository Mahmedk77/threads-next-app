import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Navbar = () => {
  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16 bg-white">
        <SignedOut>
            <SignInButton> 
                <button className="text-[#6c47ff] bg-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign In
                </button>
            </SignInButton>
                <SignUpButton>
                    <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign Up
                    </button>
                </SignUpButton>
        </SignedOut>
        <SignedIn>
            <UserButton />
        </SignedIn>
    </header>
  )
}

export default Navbar