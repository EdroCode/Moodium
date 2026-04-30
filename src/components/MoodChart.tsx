import {
  Bar,
  BarChart,
  AreaChart,
  CartesianGrid,
  Area,
  XAxis,
  Cell,
  LabelList,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import { MoodChartData } from "@/types/mood";
import { Smile, ThumbsUp, Meh, Frown, Angry } from "lucide-react";

const moods = [
  { label: "Great", color: "bg-mood-great/40 text-mood-great", icon: Smile },
  { label: "Good", color: "bg-mood-good/40 text-mood-good", icon: ThumbsUp },
  { label: "Okay", color: "bg-mood-okay/40 text-mood-okay", icon: Meh },
  { label: "Low", color: "bg-mood-low/40 text-mood-low", icon: Frown },
  { label: "Bad", color: "bg-mood-bad/40 text-mood-bad", icon: Angry },
];

const moodColors: Record<string, string> = {
  great: "var(--color-mood-great)",
  good: "var(--color-mood-good)",
  okay: "var(--color-mood-okay)",
  low: "var(--color-mood-low)",
  bad: "var(--color-mood-bad)",
};

const chartConfig = {
  mood: {
    label: "Mood",
    color: "#2563eb",
  },
} satisfies ChartConfig;

type MoodChartProps = {
  chartData: MoodChartData[];
};

export default function MoodChart({ chartData }: MoodChartProps) {
  return (
    <div className="bg-white p-4 h-fit rounded-lg shadow-sm hover:shadow-md">
      <h1 className="font-play text-primary/80 font-bold text-md">
        MOOD TREND
      </h1>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => v.slice(5)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="mood" radius={4}>
            <LabelList
              dataKey="moodLabel"
              position="top"
              className="fill-muted-foreground text-xs"
            />
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={moodColors[entry.moodLabel] ?? "#94a3b8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export function AreaMoodChart({ chartData }: MoodChartProps) {
  return (
    <div className="bg-white p-4 h-fit w-fill rounded-lg shadow-sm hover:shadow-md">
      <h1 className="font-play text-primary/80 font-bold text-md">
        MOOD TREND
      </h1>
      <ChartContainer config={chartConfig}>
        <AreaChart
          className="rounded-2xl bg-gray-100/20 shadow-xs"
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(5)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="mood"
            type="natural"
            fill="var(--color-logo)"
            fillOpacity={0.4}
            stroke="var(--color-logo-dark)"
            strokeWidth={1.5}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
