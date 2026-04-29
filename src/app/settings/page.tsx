"use client";

import Sidebar from "../../components/Sidebar";
import { Calendar } from "@/components/ui/calendar";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-gray-200/30 w-full h-full">
      <Sidebar />
      <main className="p-4 w-full h-full">
        <h1 className="text-primary text-2xl">Settings</h1>
      </main>
    </div>
  );
}
