"use client";
import { useUser, useClerk } from "@clerk/nextjs";
import { useMoodEntries } from "@/hooks/useMoodEntries";

export default function ProfileCard() {
  const { user } = useUser();
  const { entries, loading } = useMoodEntries();

  const { openUserProfile } = useClerk();

  if (loading)
    return (
      <div className="lex items-center w-full border border-gray-200 rounded-lg p-2 gap-3 hover:bg-logo/20 transition-all duration-200 cursor-pointer">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary border-l-transparent border-r-transparent border-b-transparent animate-spin" />
        </div>
      </div>
    );

  return (
    <button
      onClick={() => openUserProfile()}
      className="flex items-center w-full border border-gray-200 rounded-lg p-2 gap-3 hover:bg-logo/20 transition-all duration-200 cursor-pointer"
    >
      <img
        src={user?.imageUrl}
        alt="avatar"
        className="w-9 h-9 rounded-full object-cover shrink-0"
      />
      <div className="flex flex-col text-left overflow-hidden">
        <h1 className="font-play text-sm text-primary font-semibold truncate">
          {user?.fullName}
        </h1>
        <h1 className="font-play text-xs text-primary/50 truncate">
          {user?.emailAddresses[0].emailAddress}
        </h1>
      </div>
    </button>
  );
}
