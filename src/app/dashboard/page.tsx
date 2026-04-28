"use client";

import { LayoutDashboard, Calendar, Plus, LineChart } from "lucide-react";
import Sidebar from "../../components/ui/Sidebar";
import { useUser } from "@clerk/nextjs";
import MoodEntry from "@/components/MoodEntry";

const moods = [
  { label: "Great", color: "bg-emerald-900/40 text-emerald-200" },
  { label: "Good", color: "bg-slate-800 text-slate-200" },
  { label: "Okay", color: "bg-amber-900/40 text-amber-200" },
  { label: "Low", color: "bg-orange-900/40 text-orange-200" },
  { label: "Bad", color: "bg-zinc-900 text-zinc-300" },
];

const mockEntries = Array.from({ length: 30 }).map((_, i) => {
  const moodIndex = Math.floor(Math.random() * moods.length);
  return {
    day: i + 1,
    ...moods[moodIndex],
  };
});

export default function Dashboard() {
  const now = new Date();
  const { user } = useUser();

  return (
    <div className="flex min-h-screen bg-white text-zinc-100 font-sans">
      <Sidebar />
      <div className="flex flex-col p-8 gap-2">
        <h1 className="text-mood-great text-xl font-semibold font-play">
          {new Date().toDateString()}
        </h1>
        <h1 className="text-primary text-3xl font-semibold font-play">
          Welcome back {user?.fullName}
        </h1>
        <MoodEntry />
      </div>
    </div>
  );
}
