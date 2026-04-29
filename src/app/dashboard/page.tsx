"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import MoodEntry from "@/components/MoodEntry";
import MoodStreak from "@/components/MoodStreak";
import WeekResume from "@/components/WeekResume";
import DailyQuote from "@/components/DailyQuote";
import RecentEntries from "@/components/RecentEntries";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <div className="flex min-h-screen bg-gray-300/30 w-full">
      <Sidebar />

      <main className="flex flex-col w-full gap-4 p-4">
        <header className="flex items-center gap-4">
          <Image
            src="/moodium.png"
            alt="Moodium Logo"
            width={90}
            height={48}
            className="hover:scale-115 hover:rotate-10 transition-all duration-500"
          />
          <div className="flex flex-col my-4">
            <p className="text-mood-great text-xl font-semibold font-dm-sans">
              {new Date().toDateString()}
            </p>
            <h1 className="text-primary text-3xl font-semibold font-dm-sans">
              Welcome back, {user?.fullName}
            </h1>
            <p className="text-primary/80 text-xl font-semibold font-dm-sans">
              How was your day?
            </p>
          </div>
        </header>

        <div className="grid grid-cols-9 gap-4">
          <div className="col-span-7 flex flex-col gap-4">
            <MoodEntry />
            <RecentEntries />
            <DailyQuote />
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <MoodStreak />
            <WeekResume />
          </div>
        </div>
      </main>
    </div>
  );
}
