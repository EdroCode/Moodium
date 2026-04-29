"use client";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { getRecentEntries, getDominantMood } from "@/lib/moodUtils";
import { ArrowBigRight } from "lucide-react";

const MOODS = [
  { key: "great", label: "Great", color: "bg-mood-great" },
  { key: "good", label: "Good", color: "bg-mood-good" },
  { key: "okay", label: "Okay", color: "bg-mood-okay" },
  { key: "low", label: "Low", color: "bg-mood-low" },
  { key: "bad", label: "Bad", color: "bg-mood-bad" },
];

const DOMINANT_LABELS: Record<string, { title: string; subtitle: string }> = {
  great: {
    title: "Excellent week",
    subtitle: "You've been on top of your game this week.",
  },
  good: {
    title: "Mostly good",
    subtitle: "You've had more good days than low ones this week.",
  },
  okay: {
    title: "Steady week",
    subtitle: "A balanced week, nothing too high or low.",
  },
  low: {
    title: "Tough week",
    subtitle: "It's been a harder week. That's okay.",
  },
  bad: {
    title: "Rough week",
    subtitle: "You got through it. That counts for something.",
  },
};

export default function WeekResume() {
  const { entries, loading } = useMoodEntries();
  const week = getRecentEntries(entries, 7);
  const dominant = getDominantMood(week) ?? "okay";
  const { title, subtitle } = DOMINANT_LABELS[dominant];

  const maxCount = 7;

  const moodCounts = MOODS.map((m) => ({
    ...m,
    count: week.filter((e) => e.mood === m.key).length,
  }));

  if (loading) return null;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm hover:shadow-md p-4 flex flex-col gap-3">
      <p className="font-play text-primary/60 font-bold text-xs tracking-widest uppercase">
        This Week's Pattern
      </p>

      <div>
        <h1 className="font-play text-primary font-bold text-2xl">{title}</h1>
        <p className="font-play text-primary/60 text-sm mt-1">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {moodCounts.map((m) => (
          <div key={m.key} className="flex items-center gap-3">
            <span className="font-play text-primary/90 text-sm w-4 text-right">
              {m.count}
            </span>
            <span className="font-play text-primary text-sm w-10">
              {m.label}
            </span>
            <div className="flex-1 bg-gray-100 rounded-full h-3">
              <div
                className={`${m.color} h-3 rounded-full transition-all duration-500`}
                style={{
                  width:
                    m.count === 0 ? "8px" : `${(m.count / maxCount) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-2 pt-3 items-center">
        <a
          href="/insights"
          className="flex items-center justify-center bg-white hover:bg-primary/10 duration-200 transition-all p-2 rounded-lg"
        >
          <h1 className="font-play text-primary text-ms px-4">View Insights</h1>
          <ArrowBigRight className="text-primary w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
