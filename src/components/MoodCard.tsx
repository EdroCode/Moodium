"use client";

import { Smile, ThumbsUp, Meh, Frown, Angry } from "lucide-react";

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
    icon: ThumbsUp,
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

export default function MoodCard({
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
