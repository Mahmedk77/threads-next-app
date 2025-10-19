import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Topbar from "../../components/shared/Topbar";
import LeftSidebar from "../../components/shared/LeftSidebar";
import RightSidebar from "../../components/shared/RightSidebar";
import Bottombar from "../../components/shared/Bottombar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threads",
  description: "Social Media App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
          <Topbar />
      
          <main className="flex flex-row">
            <LeftSidebar />
            <section className="flex min-h-screen  flex-1 flex-col items-center px-6 pb-10 pt-16 max-md:pb-32 sm:px-8"> 
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>
            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  );
}
