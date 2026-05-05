"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import Sidebar from "../../components/Sidebar";

const DEFAULT_COLORS = {
  great: "#4f8a5b",
  good: "#5b7dba",
  okay: "#d6a84d",
  low: "#e07a4f",
  bad: "#5a5a5a",
};

const MOOD_LABELS = ["great", "good", "okay", "low", "bad"] as const;

export default function Settings() {
  const { user, isLoaded } = useUser();
  const [theme, setTheme] = useState("system");
  const [moodColors, setMoodColors] = useState(DEFAULT_COLORS);
  const [notifications, setNotifications] = useState(false);
  const [notificationTime, setNotificationTime] = useState("20:00");
  const [timeFormat, setTimeFormat] = useState("24h");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [weekStartsOn, setWeekStartsOn] = useState("monday");
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    supabase
      .from("user_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          setTheme(data.theme);
          setMoodColors(data.mood_colors);
          setNotifications(data.notifications_enabled);
          setNotificationTime(data.notification_time ?? "20:00");
          setTimeFormat(data.time_format);
          setDateFormat(data.date_format);
          setWeekStartsOn(data.week_starts_on);

          // update CSS variables from database colors
          const root = document.documentElement;
          const colors = data.mood_colors;
          root.style.setProperty("--color-mood-great", colors.great);
          root.style.setProperty("--color-mood-good", colors.good);
          root.style.setProperty("--color-mood-okay", colors.okay);
          root.style.setProperty("--color-mood-low", colors.low);
          root.style.setProperty("--color-mood-bad", colors.bad);
        }
        setLoading(false);
      });
  }, [user, isLoaded]);

  async function handleSave() {
    if (!user) return;

    await supabase.from("user_preferences").upsert({
      user_id: user.id,
      theme,
      mood_colors: moodColors,
      notifications_enabled: notifications,
      notification_time: notificationTime,
      time_format: timeFormat,
      date_format: dateFormat,
      week_starts_on: weekStartsOn,
      updated_at: new Date().toISOString(),
    });

    // update CSS variables immediately on save
    const root = document.documentElement;
    root.style.setProperty("--color-mood-great", moodColors.great);
    root.style.setProperty("--color-mood-good", moodColors.good);
    root.style.setProperty("--color-mood-okay", moodColors.okay);
    root.style.setProperty("--color-mood-low", moodColors.low);
    root.style.setProperty("--color-mood-bad", moodColors.bad);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!isLoaded || loading) {
    return (
      <div className="flex min-h-screen bg-gray-200/30 w-full h-full">
        <Sidebar />
        <main className="flex flex-col w-full gap-4 p-4">
          <div className="flex items-center justify-center w-full h-full bg-white rounded-lg">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
              <div className="absolute inset-0 rounded-full border-4 border-t-primary border-l-transparent border-r-transparent border-b-transparent animate-spin" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-200/30 w-full h-full">
      <Sidebar />
      <main className="flex flex-col w-full gap-4 p-4">
        <div className="flex flex-col gap-6 bg-white p-6 shadow-xs hover:shadow-md rounded-lg w-full h-full">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-play font-bold text-primary">
                SETTINGS
              </p>
              <p className="text-base font-play text-primary/50">
                Manage your preferences
              </p>
            </div>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary cursor-pointer text-white text-base font-play font-bold rounded-lg transition-all hover:opacity-90 active:scale-95"
            >
              {saved ? "SAVED ✓" : "SAVE CHANGES"}
            </button>
          </div>

          <hr className="border-gray-100" />

          <section className="flex flex-col gap-4">
            <p className="text-sm font-play font-bold text-primary/60 uppercase tracking-widest">
              Appearance
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-play font-bold text-primary">
                  Theme
                </p>
                <p className="text-sm font-play text-primary/40">
                  Choose your preferred theme
                </p>
              </div>
              <div className="flex gap-2">
                {["light", "dark", "system"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-3 cursor-pointer py-1.5 text-sm font-play font-bold rounded-lg border uppercase transition-all ${
                      theme === t
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 text-primary/60 hover:border-primary/30"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section className="flex flex-col gap-4">
            <p className="text-sm font-play font-bold text-primary/60 uppercase tracking-widest">
              Mood Colors
            </p>
            <div className="flex flex-col gap-3">
              {MOOD_LABELS.map((mood) => (
                <div key={mood} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: moodColors[mood] }}
                    />
                    <p className="text-base font-play font-bold text-primary capitalize">
                      {mood}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-play text-primary/30 font-mono">
                      {moodColors[mood]}
                    </span>
                    <input
                      type="color"
                      value={moodColors[mood]}
                      onChange={(e) =>
                        setMoodColors((prev) => ({
                          ...prev,
                          [mood]: e.target.value,
                        }))
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          <section className="flex flex-col gap-4">
            <p className="text-sm font-play font-bold text-primary/60 uppercase tracking-widest">
              Notifications
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-base font-play font-bold text-primary">
                  Daily reminder
                </p>
                <p className="text-sm font-play text-primary/40">
                  Get reminded to log your mood
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-11 h-6 cursor-pointer rounded-full transition-colors ${notifications ? "bg-primary" : "bg-gray-200"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    notifications ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            {notifications && (
              <div className="flex items-center justify-between">
                <p className="text-base font-play text-primary/60">
                  Reminder time
                </p>
                <input
                  type="time"
                  value={notificationTime}
                  onChange={(e) => setNotificationTime(e.target.value)}
                  className="text-base font-play border border-gray-200 rounded-lg px-3 py-1.5 text-primary"
                />
              </div>
            )}
          </section>

          <hr className="border-gray-100" />

          <section className="flex flex-col gap-4">
            <p className="text-sm font-play font-bold text-primary/60 uppercase tracking-widest">
              Formats
            </p>

            <div className="flex items-center justify-between">
              <p className="text-base font-play font-bold text-primary">
                Time format
              </p>
              <div className="flex gap-2">
                {["12h", "24h"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setTimeFormat(f)}
                    className={`px-3 py-1.5 text-sm cursor-pointer font-play font-bold rounded-lg border transition-all ${
                      timeFormat === f
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 text-primary/60 hover:border-primary/30"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-base font-play font-bold text-primary">
                Date format
              </p>
              <div className="flex gap-2">
                {["DD/MM/YYYY", "MM/DD/YYYY"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setDateFormat(f)}
                    className={`px-3 py-1.5 text-sm cursor-pointer font-play font-bold rounded-lg border transition-all ${
                      dateFormat === f
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 text-primary/60 hover:border-primary/30"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-base font-play font-bold text-primary">
                Week starts on
              </p>
              <div className="flex gap-2">
                {["monday", "sunday"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setWeekStartsOn(d)}
                    className={`px-3 py-1.5 text-sm cursor-pointer font-play font-bold rounded-lg border uppercase transition-all ${
                      weekStartsOn === d
                        ? "bg-primary text-white border-primary"
                        : "border-gray-200 text-primary/60 hover:border-primary/30"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
