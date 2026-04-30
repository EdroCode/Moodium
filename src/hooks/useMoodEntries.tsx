import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { MoodEntry } from "@/types/mood";

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
