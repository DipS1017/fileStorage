"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from 'next/image'
const Landing=()=> {
  const { user } = useUser();
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-indigo-200">
    <nav className="py-6 sticky top-0 px-6 flex justify-between items-center bg-neutral-50 shadow-sm">
        <div className="flex items-center space-x-4">
          <span className="text-3xl pl-2 font-semibold text-primary">
            FileStorage
          </span>
        </div>
        <div className="space-x-4">
          {user ? (
            <Button variant="default">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="outline">
                <Link href="/sign-in">Log in</Link>
              </Button>
              <Button>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Store Your Files Safely and Securely
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Experience peace of mind with our state-of-the-art file storage
          solution. Keep your important documents protected and accessible
          anytime, anywhere.
        </p>
        <Button size="lg" className="text-lg px-8 py-4">

              <Link href="/dashboard">
          Get Started
</Link>
        </Button>
        <div className="flex justify-center py-6">
        <Image
          src="/1.png" width={1200} height={800} alt="File storage" />
          </div>
      </main>
    </div>
  );
}
export default Landing
