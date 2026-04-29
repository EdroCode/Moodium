"use client";
import { Flame, ArrowBigRight } from "lucide-react";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import { getStreak } from "@/lib/moodUtils";
import { useUser } from "@clerk/nextjs";
import { hasLoggedToday } from "@/lib/moodUtils";
import { useState, useEffect } from "react";

function WeekCircle({ active, day }: { active: boolean; day: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-play text-primary/40">{day}</span>
      <span
        className={
          active
            ? "block w-6 h-6 rounded-full bg-logo"
            : "block w-6 h-6 rounded-full bg-mood-bad/20 border"
        }
      ></span>
    </div>
  );
}

function getStreakText(days: number) {
  if (days < 9) return "Day";
  return "Days";
}

export default function MoodStreak() {
  const { entries, loading } = useMoodEntries();
  const streak = getStreak(entries);

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const hasEntry = entries.some((e) => e.date === dateStr);
    const dayInitial = d
      .toLocaleDateString("en-GB", { weekday: "short" })
      .slice(0, 1);
    return { dateStr, hasEntry, dayInitial };
  });

  const { user } = useUser();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (!user) return;
    hasLoggedToday(user.id).then(setLogged);
  }, [user]);

  if (loading) return null;

  return (
    <div className="flex flex-col bg-white shadow-sm hover:shadow-md rounded-lg w-full h-80 p-4 gap-4">
      <h1 className="font-play text-primary/80 font-bold text-md">
        CURRENT STREAK
      </h1>
      <div className="flex gap-4 items-center">
        <Flame
          className={
            logged
              ? "w-24 h-20 text-mood-low bg-mood-low/20 rounded-3xl p-2"
              : "w-24 h-20 text-mood-good/80 bg-mood-good/40 rounded-3xl p-2 animate-pulse"
          }
        />
        <h1 className="font-ultra text-primary text-4xl px-4">
          {streak} {getStreakText(streak)}
        </h1>
      </div>
      <h1 className="font-play text-primary font-semibold text-md">
        {streak === 0 ? "You can do it!" : "Keep it going!"}
      </h1>
      <div className="flex gap-2">
        {last7Days.map((day) => (
          <WeekCircle
            key={day.dateStr}
            active={day.hasEntry}
            day={day.dayInitial}
          />
        ))}
      </div>
      <div className=" border-t" />
      <a
        href="/calendar-page"
        className="flex items-center justify-center  bg-white hover:bg-primary/10 duration-200 transition-all p-2 rounded-lg"
      >
        <h1 className="font-play text-primary text-ms px-4">
          View all my Streaks
        </h1>
        <ArrowBigRight className="text-primary w-4 h-4" />
      </a>
    </div>
  );
}
