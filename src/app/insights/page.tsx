"use client";
import Sidebar from "../../components/Sidebar";
import WeekResume from "@/components/WeekResume";
import MonthStats from "@/components/MonthStats";
import MoodChart, { AreaMoodChart } from "@/components/MoodChart";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import {
  getRecentEntries,
  moodToNumber,
  getAverageMood,
  MOOD_LABEL,
} from "@/lib/moodUtils";
import { FlameIcon } from "lucide-react";
import { ChartPieSimple } from "@/components/ui/PieChart";
import { MoodTimeline } from "@/components/MoodBar";

function Streak() {
  return (
    <div className="w-full flex flex-col gap-4 bg-white rounded-lg shadow-sm hover:shadow-md p-4">
      <h1 className="font-play font-bold text-md">CURRENT STREAK</h1>
      <div className="flex items-center">
        <FlameIcon className="text-mood-low w-14 h-14" fill="currentColor" />
        <p className="font-play font-semibold text-3xl">15 Days</p>
      </div>
    </div>
  );
}

function Average() {
  const { entries, loading } = useMoodEntries();
  const average = getAverageMood(getRecentEntries(entries, 7));
  return (
    <div className="w-full flex flex-col gap-4 bg-white rounded-lg shadow-sm hover:shadow-md p-4">
      <h1 className="font-play font-bold text-md">WEEKLY AVERAGE MOOD</h1>
      <p className="font-play font-semibold text-3xl">
        {average !== null
          ? `${MOOD_LABEL[Math.round(average)]} (${average.toFixed(1)}/5)`
          : "No data"}
      </p>
    </div>
  );
}

export default function Insights() {
  const { entries, loading } = useMoodEntries();

  const month_data = getRecentEntries(entries, 30).map((entry) => ({
    date: entry.date,
    mood: moodToNumber(entry.mood ?? ""),
    moodLabel: entry.mood ?? "",
  }));

  const week_data = getRecentEntries(entries, 7).map((entry) => ({
    date: entry.date,
    mood: moodToNumber(entry.mood ?? ""),
    moodLabel: entry.mood ?? "",
  }));

  const moodCounts_month = ["great", "good", "okay", "low", "bad"]
    .map((mood) => ({
      date: "",
      moodLabel: mood,
      mood: month_data.filter((d) => d.moodLabel.toLowerCase() === mood).length,
    }))
    .filter((d) => d.mood > 0);

  const moodCounts_week = ["great", "good", "okay", "low", "bad"]
    .map((mood) => ({
      date: "",
      moodLabel: mood,
      mood: week_data.filter((d) => d.moodLabel.toLowerCase() === mood).length,
    }))
    .filter((d) => d.mood > 0);

  return (
    <div className="flex min-h-screen bg-gray-200/30">
      <Sidebar />
      <main className="flex flex-col p-4 gap-4 w-full">
        <div className="flex gap-4">
          <Average />
          <Streak />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <WeekResume />
          <div className="flex gap-4">
            <ChartPieSimple chartData={moodCounts_week} title="- Week" />
            <ChartPieSimple chartData={moodCounts_month} title="- Month" />
          </div>
          <MonthStats />
          <AreaMoodChart chartData={month_data} />
          <div className="col-span-2">
            <MoodTimeline chartData={month_data} title="" />
          </div>
        </div>
      </main>
    </div>
  );
}
