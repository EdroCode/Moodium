"use client";

import Sidebar from "../../components/Sidebar";
import WeekResume from "@/components/WeekResume";
import MonthStats from "@/components/MonthStats";
import MoodChart, { AreaMoodChart } from "@/components/MoodChart";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { getRecentEntries, moodToNumber } from "@/lib/moodUtils";

export default function Insights() {
  const { entries, loading } = useMoodEntries();

  const data = getRecentEntries(entries, 30).map((entry) => ({
    date: entry.date,
    mood: moodToNumber(entry.mood ?? ""),
    moodLabel: entry.mood ?? "",
  }));

  return (
    <div className="flex min-h-screen bg-gray-200/30">
      <Sidebar />
      <main className="p-4 grid grid-cols-2 gap-4 w-full">
        <WeekResume />
        <MonthStats />
        <MoodChart chartData={data} />
        <AreaMoodChart chartData={data} />
      </main>
    </div>
  );
}
