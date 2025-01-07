import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger } from "./ui/sidebar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <SidebarTrigger />
            <span className="font-bold">Dashboard</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
