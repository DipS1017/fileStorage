import {
  FileInputIcon,
  StarIcon,
  TrashIcon,
  LucideIcon,
  LayoutDashboard,
} from "lucide-react";

export interface sidebarItem {
  title: string;
  icon: LucideIcon;
  url: string;
}
export const platformItem: sidebarItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
];
export const applicationItem: sidebarItem[] = [
  {
    title: "Files",
    url: "/file",
    icon: FileInputIcon,
  },
  {
    title: "Favorites",
    url: "/favorites",
    icon: StarIcon,
  },
  {
    title: "Trash",
    url: "/trash",
    icon: TrashIcon,
  },
];
