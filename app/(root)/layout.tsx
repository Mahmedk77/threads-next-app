import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Topbar from "../../components/shared/Topbar";
import LeftSidebar from "../../components/shared/LeftSidebar";
import RightSidebar from "../../components/shared/RightSidebar";
import Bottombar from "../../components/shared/Bottombar";
import "../globals.css"
import Navbar from "@/components/shared/Navbar";

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
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black h-screen `}>
          <Topbar />
          <main className="flex flex-row ">
            <LeftSidebar />
            <section className="flex max-h-screen overflow-y-scroll flex-1 flex-col items-center px-6 pt-8 lg:mt-6 pb-32 xl:px-8 no-scrollbar "> 
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
