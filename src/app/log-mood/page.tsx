"use client";

import Sidebar from "../../components/Sidebar";
import MoodEntry from "@/components/MoodEntry";
import MoodStreak from "@/components/MoodStreak";
import WeekResume from "@/components/WeekResume";
import DailyQuote from "@/components/DailyQuote";
import RecentEntries from "@/components/RecentEntries";
import MonthStats from "@/components/MonthStats";

export default function LogMood() {
  return (
    <div className="flex min-h-screen bg-gray-200/30 font-sans ">
      <Sidebar />
      <main className="p-4">
        <MoodEntry />
      </main>
    </div>
  );
}
