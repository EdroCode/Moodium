"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useMoodEntries } from "@/hooks/useMoodEntries";
import SignOutButton from "./SignOutButton";
import { Settings } from "lucide-react";

export default function ProfileCard() {
  const { user } = useUser();
  const { entries, loading } = useMoodEntries();
  const { openUserProfile } = useClerk();

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center w-full font-play border border-gray-200 rounded-lg p-2 gap-3">
        loading...
      </div>
    );
  }

  return (
    <div ref={containerRef} className=" relative w-full">
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center w-full border border-gray-200 rounded-lg p-2 gap-3 hover:bg-logo/20 transition-all duration-200"
      >
        <img
          src={user?.imageUrl}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />

        <div className="flex flex-col text-left overflow-hidden">
          <h1 className="text-sm font-semibold font-play truncate">
            {user?.fullName}
          </h1>
          <h1 className="text-xs opacity-50 font-play truncate">
            {user?.emailAddresses[0].emailAddress}
          </h1>
        </div>
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <SignOutButton />

          <button
            onClick={() => openUserProfile()}
            className="flex w-full items-center gap-2 font-dm-sans text-md text-primary transition-all duration-200 p-2 rounded-lg cursor-pointer hover:font-semibold"
          >
            <Settings className="w-4 h-4" />
            Preferences
          </button>
        </div>
      )}
    </div>
  );
}
