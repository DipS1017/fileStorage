import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex h-screen">
          <AppSidebar />
          <main className="bg-red-500 flex-1 ">
            <SidebarTrigger />
            {children}
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
