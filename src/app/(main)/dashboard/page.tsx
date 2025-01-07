import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <SidebarInset className="min-h-screen bg-background">
        <main className="flex-1 p-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
            <div className="flex space-x-4">
              <Button>Add File</Button>
              <Button variant="outline">View Reports</Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
    </div>
  );
};

export default DashboardPage;
