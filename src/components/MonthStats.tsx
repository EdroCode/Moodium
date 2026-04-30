"use client";

import { useMoodEntries } from "@/hooks/useMoodEntries";
import {
  getDominantMood,
  getAverageMood,
  getRecentEntries,
} from "@/lib/moodUtils";

const MOOD_COLORS: Record<string, string> = {
  great: "text-mood-great",
  good: "text-mood-good",
  okay: "text-mood-okay",
  low: "text-mood-low",
  bad: "text-mood-bad",
};

export default function MonthStats() {
  const { entries, loading } = useMoodEntries();

  if (loading)
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center rounded-2xl bg-white shadow-sm p-12 text-center">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-l-transparent border-r-transparent border-b-transparent animate-spin" />
        </div>
        <p className="font-dm-sans text-primary/50 text-sm tracking-wide">
          Processing…
        </p>
      </div>
    );

  const now = new Date();
  const monthName = now.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const monthEntries = entries.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });

  const daysInMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).getDate();
  const dominant = getDominantMood(monthEntries);
  const average = getAverageMood(monthEntries);

  const stats = [
    {
      label: "Entries logged",
      value: `${monthEntries.length} / ${daysInMonth}`,
    },
    {
      label: "Dominant mood",
      value: dominant
        ? dominant.charAt(0).toUpperCase() + dominant.slice(1)
        : "—",
      mood: dominant,
    },
    { label: "Average score", value: average ? `${average} / 5` : "—" },
    { label: "Days remaining", value: `${daysInMonth - now.getDate()}` },
  ];

  return (
    <div className="flex flex-col w-full bg-white shadow-sm hover:shadow-md rounded-lg p-4 gap-3">
      <div>
        <p className="font-play text-primary/60 font-bold text-xs tracking-widest uppercase">
          This Month
        </p>
        <h2 className="font-dm-sans text-primary font-bold text-lg capitalize">
          {monthName}
        </h2>
      </div>

      <div className="flex flex-col gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
          >
            <p className="font-dm-sans text-primary/50 text-xs">{stat.label}</p>
            <p
              className={`font-dm-sans text-sm font-semibold ${stat.mood ? MOOD_COLORS[stat.mood] : "text-primary"}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
