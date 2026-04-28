"use client";

import { Smile, ThumbsUp, Meh, Frown, Angry, Pen } from "lucide-react";

const moods = [
  {
    label: "Great",
    color: "bg-mood-great/40 text-mood-great",
    icon: Smile,
  },
  {
    label: "Good",
    color: "bg-mood-good/40 text-mood-good",
    icon: ThumbsUp,
  },
  {
    label: "Okay",
    color: "bg-mood-okay/40 text-mood-okay",
    icon: Meh,
  },
  {
    label: "Low",
    color: "bg-mood-low/40 text-mood-low",
    icon: Frown,
  },
  {
    label: "Bad",
    color: "bg-mood-bad/40 text-mood-bad",
    icon: Angry,
  },
];

function MoodCard({
  label,
  color,
  Icon,
  onClick,
}: {
  label: string;
  color: string;
  Icon: any;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col cursor-pointer items-center justify-center gap-3 p-6 rounded-md shadow-sm hover:shadow-md hover:scale-105 transition w-40 h-40 ${color}`}
    >
      <div className="w-18 h-18 rounded-full flex items-center justify-center bg-white/60">
        <Icon className="w-12 h-12" />
      </div>
      <span className="text-md font-play text-primary font-medium">
        {label}
      </span>
    </button>
  );
}

export default function MoodEntry() {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-play text-primary mb-6">
        How are you feeling right now?
      </h2>

      <div className="flex gap-4 justify-between flex-wrap">
        {moods.map((mood) => (
          <MoodCard
            key={mood.label}
            label={mood.label}
            color={mood.color}
            Icon={mood.icon}
            onClick={() => console.log(mood.label)}
          />
        ))}
      </div>

      <div className="my-6 border-t" />

      <div className="flex items-center gap-2 text-gray-700">
        <Pen></Pen>
        <input
          className="w-full font-play outline-none text-md"
          placeholder="Add a note, some tags, reflect..."
        />
      </div>
    </div>
  );
}
