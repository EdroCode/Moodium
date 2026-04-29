"use client";
import {
  Settings,
  SignalHigh,
  SquarePen,
  LayoutDashboard,
  Calendar,
} from "lucide-react";
import SidebarProfile from "./SidebarProfile";
import { usePathname } from "next/navigation";

const items = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Calendar", icon: Calendar, href: "/calendar-page" },
  { name: "Log Mood", icon: SquarePen, href: "/log-mood" },
  { name: "Insights", icon: SignalHigh, href: "/insights" },
  { name: "Settings", icon: Settings, href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col h-screen w-60 border-r border-gray-200 bg-white shrink-0">
      <div className="p-4">
        <a className="flex gap-2 items-center">
          <span className="block w-6 h-6 rounded-full bg-logo"></span>
          <div className="flex">
            <h1 className="text-2xl text-zinc-900 font-ultra font-light">
              moodi
            </h1>
            <h1 className="text-2xl text-logo font-ultra font-light">UM</h1>
          </div>
        </a>
      </div>

      <hr className="w-full h-px border-0 bg-primary/10" />

      <nav className="flex-1 space-y-1 px-2 py-4">
        {items.map(({ name, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <a
              key={name}
              href={href}
              className={`flex items-center font-play text-lg text-primary gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${
                isActive ? "bg-logo/20" : "hover:bg-logo/20"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-logo" : ""}`}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <span className={isActive ? "font-semibold" : ""}>{name}</span>
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <SidebarProfile />
      </div>
    </aside>
  );
}
