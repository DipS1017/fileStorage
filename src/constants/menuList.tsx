import {
  Calendar,
  Home,
  Inbox,
  FileInputIcon,
  TrashIcon,
  StarIcon,
  LucideIcon,
} from "lucide-react";

// Menu items.
export interface sidebarItem {
  title: string;
  icon: LucideIcon;
  url: string;
}
export const items: sidebarItem[] = [
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
