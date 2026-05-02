"use client";
import { Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { type ChartConfig } from "@/components/ui/chart";
import { MoodChartData } from "@/types/mood";

const moodColors: Record<string, string> = {
  great: "var(--color-mood-great)",
  good: "var(--color-mood-good)",
  okay: "var(--color-mood-okay)",
  low: "var(--color-mood-low)",
  bad: "var(--color-mood-bad)",
};

const chartConfig = {
  great: { label: "Great", color: "var(--color-mood-great)" },
  good: { label: "Good", color: "var(--color-mood-good)" },
  okay: { label: "Okay", color: "var(--color-mood-okay)" },
  low: { label: "Low", color: "var(--color-mood-low)" },
  bad: { label: "Bad", color: "var(--color-mood-bad)" },
} satisfies ChartConfig;
type MoodChartProps = {
  chartData: MoodChartData[];
};
export function ChartPieSimple({
  chartData,
  title = "Mood Distribution",
}: {
  chartData: MoodChartData[];
  title?: string;
}) {
  return (
    <Card className="flex flex-col w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="font-play text-primary/60 font-bold text-xs tracking-widest uppercase ">
          Mood Distribution {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="mood" nameKey="moodLabel">
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={moodColors[entry.moodLabel.toLowerCase()] ?? "#94a3b8"}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
