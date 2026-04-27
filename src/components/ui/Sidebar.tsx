"use client";

import {
  Menu,
  User,
  Settings,
  SignalHigh,
  SquarePen,
  LayoutDashboard,
  Calendar,
} from "lucide-react";

export default function Sidebar() {
  const items = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Calendar", icon: Calendar, href: "/calendar-page" },
    { name: "Log Mood", icon: SquarePen, href: "/log-mood" },
    { name: "Insights", icon: SignalHigh, href: "/insights" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <div className="flex">
      <div className="h-screen w-64 border-r border-gray-200 bg-white">
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
        <nav className="space-y-1 px-2 py-4 ">
          {items.map(({ name, icon: Icon, href }) => (
            <a
              key={name}
              href={href}
              className="flex cursor-pointer font-play items-center text-lg text-primary gap-3 rounded-lg px-3 py-2 hover:bg-mood-great/10"
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
