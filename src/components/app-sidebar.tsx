"use client";
import * as React from "react";
import {
  FileIcon,
  LayoutDashboardIcon,
  StarIcon,
  TrashIcon,
} from "lucide-react"; // Importing the icons from lucide-react
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Platform",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: <LayoutDashboardIcon />,
        },
      ],
    },

    {
      title: "Application",
      items: [
        {
          title: "Files",
          url: "/files",
          icon: <FileIcon />, // Pass the actual icon component here
        },
        {
          title: "Trash",
          url: "/trash",
          icon: <TrashIcon />, // Pass the actual icon component here
        },
        {
          title: "Favorites",
          url: "/favorites",
          icon: <StarIcon />, // Pass the actual icon component here
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon" variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarGroupLabel className="text-3xl text-primary font-bold py-10">
          FileStorage
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className={pathname === item.url ? "bg-primary" : ""}
                    >
                      <a href={item.url}>
                        {item.icon} {/* Render the icon here */}
                        {item.title}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
