import { SidebarTrigger } from "@/components/ui/sidebar";

export function SidebarTriggerWrapper() {
  return (
    <div className="absolute left-0 bottom-[15%]  z-50">
      <SidebarTrigger className="h-8 w-6 rounded-r-lg bg-primary text-primary-foreground shadow-md" />
    </div>
  );
}
