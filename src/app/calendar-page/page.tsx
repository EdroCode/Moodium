"use client";

import * as React from "react";
import Sidebar from "../../components/Sidebar";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex min-h-screen  text-zinc-100 font-sans">
      <Sidebar />

      <div className="p-4  w-full h-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="bg-gray-100 text-black rounded-lg border w-full h-full dark"
        />
      </div>
    </div>
  );
}
