
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Library,
  FolderOpen,
  History,
  Settings as SettingsIcon,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Study Activities", icon: BookOpen, href: "/study-activities" },
  { title: "Words", icon: Library, href: "/words" },
  { title: "Groups", icon: FolderOpen, href: "/groups" },
  { title: "Study Sessions", icon: History, href: "/study-sessions" },
  { title: "Settings", icon: SettingsIcon, href: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="min-h-screen border-r w-64 py-8 bg-sidebar">
      <div className="px-6 mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Lang Portal</h1>
      </div>
      <nav className="space-y-2 px-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
              location.pathname === item.href ||
                (item.href !== "/dashboard" &&
                  location.pathname.startsWith(item.href))
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50"
            )}
          >
            <item.icon size={18} />
            {item.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
