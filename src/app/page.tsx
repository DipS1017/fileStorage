import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <SidebarInset className="min-h-screen bg-background">
        <header className="sticky top-0 z-10 border-b bg-background">
          <div className="flex  justify-between h-16 items-center px-4">
            <h1 className="ml-4 text-lg font-semibold">Dashboard</h1>
            <UserButton showName={true} />
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
            <div className="flex space-x-4">
              <Button>Add File</Button>
              <Button variant="outline">View Files</Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Example content cards */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border bg-card p-4 shadow-sm"
                >
                  <h3 className="text-lg font-semibold">Card {item}</h3>
                  <p>This is some example content for card {item}.</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </SidebarInset>
    </>
  );
}
