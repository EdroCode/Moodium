"use client";
import { MoodChartData } from "@/types/mood";

const moodColors: Record<string, string> = {
  great: "var(--color-mood-great)",
  good: "var(--color-mood-good)",
  okay: "var(--color-mood-okay)",
  low: "var(--color-mood-low)",
  bad: "var(--color-mood-bad)",
};

type MoodTimelineProps = {
  chartData: MoodChartData[];
  title?: string;
  date?: boolean;
};

export function MoodTimeline({
  chartData,
  title = "Mood Timeline",
  date,
}: MoodTimelineProps) {
  const orderedData = [...chartData].reverse();

  return (
    <div className="flex flex-col gap-2 bg-white rounded-lg shadow-sm hover:shadow-md p-4">
      <h1 className="font-play font-bold text-md">{title.toUpperCase()}</h1>
      <div className="flex w-full h-8 rounded-full overflow-hidden">
        {orderedData.map((entry, index) => (
          <div
            key={index}
            className="flex-1 h-full"
            style={{
              backgroundColor:
                moodColors[entry.moodLabel.toLowerCase()] ?? "#94a3b8",
            }}
            title={`${entry.date}: ${entry.moodLabel}`}
          />
        ))}
      </div>
      {date ? (
        <div className="flex justify-between text-xs text-gray-400 font-mono">
          <span>{orderedData[0]?.date}</span>
          <span>{orderedData[orderedData.length - 1]?.date}</span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
