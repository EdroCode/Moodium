"use client";

import {
  ArrowRight,
  ArrowBigRight,
  Smile,
  ThumbsUp,
  Meh,
  Frown,
  Angry,
  Plus,
} from "lucide-react";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { getRecentEntries } from "@/lib/moodUtils";

const MOOD_CONFIG: Record<
  string,
  { bg: string; border: string; iconColor: string; icon: React.ElementType }
> = {
  great: {
    bg: "bg-mood-great/10",
    border: "border-mood-great",
    iconColor: "text-mood-great",
    icon: Smile,
  },
  good: {
    bg: "bg-mood-good/10",
    border: "border-mood-good",
    iconColor: "text-mood-good",
    icon: Smile,
  },
  okay: {
    bg: "bg-mood-okay/10",
    border: "border-mood-okay",
    iconColor: "text-mood-okay",
    icon: Meh,
  },
  low: {
    bg: "bg-mood-low/10",
    border: "border-mood-low",
    iconColor: "text-mood-low",
    icon: Frown,
  },
  bad: {
    bg: "bg-mood-bad/10",
    border: "border-mood-bad",
    iconColor: "text-mood-bad",
    icon: Angry,
  },
};

function MoodCard({
  date,
  mood,
  note,
  isToday,
}: {
  date: string;
  mood: string;
  note: string | null;
  isToday: boolean;
}) {
  const config = MOOD_CONFIG[mood];
  const Icon = config.icon;
  const d = new Date(date);
  const weekday = d
    .toLocaleDateString("en-GB", { weekday: "short" })
    .toUpperCase();
  const day = d.getDate();
  const month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();

  return (
    <div
      className={`relative flex flex-col items-center rounded-xl p-4 w-full gap-3 border-2 ${isToday ? `${config.bg} ${config.border}` : "bg-white border-gray-200"}`}
    >
      {isToday && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 text-primary/60 text-xs font-dm-sans px-2 py-0.5 rounded-full">
          TODAY
        </span>
      )}
      <div className="flex flex-col items-center">
        <p className="font-dm-sans text-primary/50 text-xs font-medium">
          {weekday}
        </p>
        <p className="font-dm-sans text-primary font-bold text-sm">
          {day} {month}
        </p>
      </div>
      <Icon className={`w-12 h-12 ${config.iconColor}`} strokeWidth={1.2} />
      <p className="font-dm-sans text-primary/70 text-xs text-center line-clamp-3 leading-relaxed">
        {note ?? "No note added."}
      </p>
    </div>
  );
}

function EmptyTodayCard() {
  return (
    <a
      href="/log-mood"
      className="flex flex-col items-center justify-center rounded-xl p-4 w-full gap-3 border-2 border-dashed border-gray-400 hover:border-mood-great/50 hover:bg-mood-great/5 transition-all duration-200 cursor-pointer"
    >
      <div className="flex flex-col items-center">
        <p className="font-dm-sans text-primary/50 text-xs font-medium">
          {new Date()
            .toLocaleDateString("en-GB", { weekday: "short" })
            .toUpperCase()}
        </p>
        <p className="font-dm-sans text-primary font-bold text-sm">
          {new Date().getDate()}{" "}
          {new Date()
            .toLocaleDateString("en-GB", { month: "short" })
            .toUpperCase()}
        </p>
      </div>
      <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
        <Plus className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
      </div>
      <p className="font-dm-sans text-primary/40 text-xs text-center">
        No entry yet.
        <br />
        Log your mood
      </p>
    </a>
  );
}

export default function RecentEntries() {
  const { entries, loading } = useMoodEntries();

  const today = new Date().toISOString().split("T")[0];
  const recent = getRecentEntries(entries, 5).slice(0, 5).reverse();
  const hasLoggedToday = recent.some((e) => e.date === today);

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

  return (
    <div className="flex flex-col w-full bg-white shadow-sm hover:shadow-md rounded-xl p-6 gap-4">
      <header className="flex justify-between items-center">
        <h1 className="font-play text-lg text-primary">Your recent entries</h1>
        <a
          href="/calendar-page"
          className="flex gap-1 items-center text-primary/50 hover:text-primary duration-200 transition-all"
        >
          <p className="font-dm-sans text-sm">View calendar</p>
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </a>
      </header>

      <main className="grid grid-cols-5 gap-2">
        {recent.length === 0 ? (
          <EmptyTodayCard />
        ) : (
          <>
            {recent.map((entry) => (
              <MoodCard
                key={entry.id}
                date={entry.date}
                mood={entry.mood}
                note={entry.note}
                isToday={entry.date === today}
              />
            ))}
            {!hasLoggedToday && <EmptyTodayCard />}
          </>
        )}
      </main>
    </div>
  );
}
