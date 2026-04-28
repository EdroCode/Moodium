"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { Smile, ThumbsUp, Meh, Frown, Angry, Pen } from "lucide-react";

const moods = [
  { label: "Great", color: "bg-mood-great/40 text-mood-great", icon: Smile },
  { label: "Good", color: "bg-mood-good/40 text-mood-good", icon: ThumbsUp },
  { label: "Okay", color: "bg-mood-okay/40 text-mood-okay", icon: Meh },
  { label: "Low", color: "bg-mood-low/40 text-mood-low", icon: Frown },
  { label: "Bad", color: "bg-mood-bad/40 text-mood-bad", icon: Angry },
];

function MoodCard({
  label,
  color,
  Icon,
  selected,
  onClick,
}: {
  label: string;
  color: string;
  Icon: any;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col cursor-pointer items-center justify-center gap-3 p-6 rounded-md shadow-sm hover:shadow-md hover:scale-105 transition w-36 h-36 ${color} ${selected ? "ring-2 ring-primary scale-105" : ""}`}
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
  const { user, isLoaded } = useUser();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alreadyLogged, setAlreadyLogged] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) {
      setChecking(false);
      return;
    }

    const checkToday = async () => {
      const today = new Date().toISOString().split("T")[0];
      const { data } = await supabase
        .from("mood_entries")
        .select("id")
        .eq("user_id", user.id)
        .eq("date", today)
        .single();

      if (data) setAlreadyLogged(true);
      setChecking(false);
    };

    checkToday();
  }, [user, isLoaded]);

  const handleSubmit = async () => {
    if (!selectedMood || !user) return;
    setLoading(true);
    setError(null);

    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("mood_entries").upsert({
      id: `${user.id}-${today}`,
      user_id: user.id,
      date: today,
      mood: selectedMood.toLowerCase(),
      note: note || null,
      tags: [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
  };

  if (!isLoaded || checking) return null;

  if (alreadyLogged || success) {
    return (
      <div className="flex flex-col gap-12 w-full min-w-4xl mx-auto bg-white items-center justify-center rounded-2xl shadow-sm hover:shadow-md p-6 text-center">
        <p className="text-lg font-play text-primary">
          You've already logged today. See you tomorrow.
        </p>
        <Smile className="text-primary/40 w-24 h-24 hover:text-logo hover:scale-105 duration-300 transition-all "></Smile>
      </div>
    );
  }

  return (
    <div className="w-full min-w-4xl mx-auto bg-white rounded-lg shadow-sm hover:shadow-md p-6">
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
            selected={selectedMood === mood.label}
            onClick={() => setSelectedMood(mood.label)}
          />
        ))}
      </div>

      <div className="my-6 border-t" />

      <div className="flex items-center gap-2 text-gray-700 mb-6">
        <Pen />
        <input
          className="w-full font-play outline-none text-md"
          placeholder="Add a note, reflect..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!selectedMood || loading}
        className="w-full py-3 cursor-pointer bg-primary text-white font-play rounded-md disabled:opacity-40 hover:opacity-90 transition"
      >
        {loading ? "Saving..." : "Save Entry"}
      </button>
    </div>
  );
}
