"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import {
  Smile,
  ThumbsUp,
  Meh,
  Frown,
  Angry,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";

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

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function FutureDay({ day }: { day: number }) {
  return (
    <div className="flex flex-col items-center rounded-xl p-3 gap-2 border border-gray-100 bg-white/30 opacity-30 min-h-28">
      <p className="font-dm-sans text-primary/30 text-xs font-bold">{day}</p>
    </div>
  );
}

function EmptyTodayDay({ day }: { day: number }) {
  return (
    <a
      href="/log-mood"
      className="flex shadow-sm flex-col items-center justify-center rounded-xl p-3 gap-2 border-2 border-dashed border-gray-300 hover:border-mood-great/50 hover:bg-mood-great/5 transition-all duration-200 min-h-28 cursor-pointer"
    >
      <p className="font-dm-sans text-primary font-bold text-xs">{day}</p>
      <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
        <Plus className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
      </div>
      <p className="font-dm-sans text-primary/30 text-xs text-center">
        Log mood
      </p>
    </a>
  );
}

function EmptyDay({ day }: { day: number }) {
  return (
    <div className="flex flex-col shadow-sm items-center rounded-xl p-3 gap-2 border border-gray-100 bg-white min-h-28">
      <p className="font-dm-sans text-primary/30 text-xs font-bold">{day}</p>
      <p className="font-dm-sans text-primary/20 text-xs mt-auto">—</p>
    </div>
  );
}

function MoodDay({
  day,
  entry,
  isToday,
}: {
  day: number;
  entry: { mood: string; note: string | null };
  isToday: boolean;
}) {
  const config = MOOD_CONFIG[entry.mood];
  const Icon = config.icon;
  return (
    <div
      className={`relative flex flex-col shadow-sm items-center rounded-xl p-3 gap-2 border ${config.bg} ${config.border} min-h-28`}
    >
      {isToday && (
        <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-white border border-gray-200 text-primary/50 text-xs font-dm-sans px-1.5 py-0.5 rounded-full">
          Today
        </span>
      )}
      <p className="font-dm-sans text-primary font-bold text-xs">{day}</p>
      <Icon className={`w-8 h-8 ${config.iconColor}`} strokeWidth={1.2} />
      <p className="font-dm-sans text-primary/50 text-xs text-center line-clamp-2 leading-relaxed">
        {entry.note ?? ""}
      </p>
    </div>
  );
}

function CalendarDay({
  day,
  dateStr,
  entry,
  isToday,
  isFuture,
}: {
  day: number;
  dateStr: string;
  entry?: { mood: string; note: string | null };
  isToday: boolean;
  isFuture: boolean;
}) {
  if (isFuture) return <FutureDay day={day} />;
  if (isToday && !entry) return <EmptyTodayDay day={day} />;
  if (!entry) return <EmptyDay day={day} />;
  return <MoodDay day={day} entry={entry} isToday={isToday} />;
}

export default function CalendarPage() {
  const { entries, loading } = useMoodEntries();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
  const today = new Date().toISOString().split("T")[0];

  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const entryMap: Record<string, { mood: string; note: string | null }> = {};
  entries.forEach((e) => {
    entryMap[e.date] = { mood: e.mood, note: e.note };
  });

  const cells = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="flex min-h-screen bg-gray-200/30 w-full">
      <Sidebar />

      <main className="flex flex-col w-full p-6 gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-play text-primary/50 text-xs tracking-widest uppercase">
              Calendar
            </p>
            <h1 className="font-dm-sans text-primary text-2xl font-bold">
              {monthName}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
            >
              <ChevronLeft
                className="w-5 h-5 text-primary/50"
                strokeWidth={1.5}
              />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="font-dm-sans text-sm text-primary/50 hover:text-primary px-3 py-1 rounded-lg hover:bg-white transition-all duration-200"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200"
            >
              <ChevronRight
                className="w-5 h-5 text-primary/50"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {WEEKDAYS.map((day) => (
            <p
              key={day}
              className="font-dm-sans text-primary/40 text-xs text-center font-medium uppercase tracking-widest"
            >
              {day}
            </p>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 rounded-full border-2 border-t-primary border-gray-200 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              return (
                <CalendarDay
                  key={dateStr}
                  day={day}
                  dateStr={dateStr}
                  entry={entryMap[dateStr]}
                  isToday={dateStr === today}
                  isFuture={dateStr > today}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
