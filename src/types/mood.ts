export type MoodEntry = {
  id: string;
  user_id: string;
  date: string;
  mood: string;
  note: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type MoodChartData = {
  date: string;
  mood: number;
  moodLabel: string;
};
