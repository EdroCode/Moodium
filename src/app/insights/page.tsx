"use client";

import Sidebar from "../../components/Sidebar";
import MoodEntry from "@/components/MoodEntry";
import MoodStreak from "@/components/MoodStreak";
import WeekResume from "@/components/WeekResume";
import DailyQuote from "@/components/DailyQuote";
import RecentEntries from "@/components/RecentEntries";
import MonthStats from "@/components/MonthStats";

export default function Insights() {
  return (
    <div className="flex min-h-screen bg-white bg-gray-200/30 ">
      <Sidebar />
      <main className="p-4 grid grid-cols-2 gap-4">
        <WeekResume />
        <MonthStats />
      </main>
    </div>
  );
}
