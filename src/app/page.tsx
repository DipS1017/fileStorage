import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      <nav className="py-4 px-6 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <svg
            className="w-8 h-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          <span className="text-xl font-bold text-gray-800">FileStorage</span>
        </div>
        <div className="space-x-4">
          <Button variant="outline">
            <Link href="/sign-in">Log in</Link>
          </Button>
          <Button>
            <Link href="/sign-up">Sign up</Link>
          </Button>
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
          Get Started
        </Button>
      </main>
    </div>
  );
}
