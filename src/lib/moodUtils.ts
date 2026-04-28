import { MoodEntry } from "@/hooks/useMoodEntries";
import { supabase } from "@/lib/supabase";

const MOOD_RANK: Record<string, number> = {
  great: 5,
  good: 4,
  okay: 3,
  low: 2,
  bad: 1,
};

export function getStreak(entries: MoodEntry[]): number {
  if (!entries.length) return 0;

  const dates = new Set(entries.map((e) => e.date));
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (dates.has(key)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export function getRecentEntry(entries: MoodEntry[]): MoodEntry | null {
  if (!entries.length) return null;
  return entries[0];
}

export function getRecentEntries(
  entries: MoodEntry[],
  days: number,
): MoodEntry[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return entries.filter((e) => new Date(e.date) >= cutoff);
}

export function getDominantMood(entries: MoodEntry[]): string | null {
  if (!entries.length) return null;
  const counts: Record<string, number> = {};
  entries.forEach((e) => {
    counts[e.mood] = (counts[e.mood] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

export function getAverageMood(entries: MoodEntry[]): number | null {
  if (!entries.length) return null;
  const sum = entries.reduce((acc, e) => acc + (MOOD_RANK[e.mood] || 0), 0);
  return Math.round((sum / entries.length) * 10) / 10;
}

export function getWeeklySummary(entries: MoodEntry[]) {
  const weeks: Record<string, MoodEntry[]> = {};
  entries.forEach((e) => {
    const d = new Date(e.date);
    const day = d.getDay();
    const monday = new Date(d);
    monday.setDate(d.getDate() - ((day + 6) % 7));
    const key = monday.toISOString().split("T")[0];
    if (!weeks[key]) weeks[key] = [];
    weeks[key].push(e);
  });
  return Object.entries(weeks)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 4)
    .map(([weekStart, entries]) => ({
      weekStart,
      entries,
      dominant: getDominantMood(entries),
      average: getAverageMood(entries),
      count: entries.length,
    }));
}

export async function hasLoggedToday(userId: string): Promise<boolean> {
  const today = new Date().toISOString().split("T")[0];
  const { data } = await supabase
    .from("mood_entries")
    .select("id")
    .eq("user_id", userId)
    .eq("date", today)
    .single();

  return !!data;
}
