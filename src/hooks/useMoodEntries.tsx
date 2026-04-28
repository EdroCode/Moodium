import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

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

export function useMoodEntries() {
  const { user, isLoaded } = useUser();
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("mood_entries")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false });

    setEntries(data || []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (!isLoaded || !user) return;
    fetchEntries();
  }, [user, isLoaded, fetchEntries]);

  return { entries, loading, refetch: fetchEntries };
}
