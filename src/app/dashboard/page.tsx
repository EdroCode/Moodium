"use client";

import { LayoutDashboard, Calendar, Plus, LineChart } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import MoodStreak from "@/components/MoodStreak";
import { useUser } from "@clerk/nextjs";
import MoodEntry from "../../components/MoodEntry";
import Image from "next/image";

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
    <div className="flex min-h-screen bg-gray-100/30 text-zinc-100 font-sans">
      <Sidebar />
      <div className="flex flex-col  p-8 gap-4">
        <div className="flex ">
          <Image
            src="/moodium.png"
            alt="Moodium Logo"
            width={90}
            height={48}
            className="hover:scale-115 hover:rotate-10 transition-all duration-500 "
          />
          <div className="flex flex-col">
            <h1 className="text-mood-great text-xl font-semibold font-play">
              {new Date().toDateString()}
            </h1>
            <h1 className="text-primary text-3xl font-semibold font-play">
              Welcome back {user?.fullName}
            </h1>
            <h1 className="text-primary/80 text-xl font-semibold font-play">
              How was your day?
            </h1>
          </div>
        </div>
        <div className="flex gap-4">
          <MoodEntry />
          <MoodStreak />
        </div>
      </div>
    </div>
  );
}
