"use client";
import { useUser, useClerk } from "@clerk/nextjs";

import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut({ redirectUrl: "/" })}
      className="flex w-full items-center gap-2 font-dm-sans text-md text-primary  transition-all duration-200 p-2 rounded-lg cursor-pointer hover:font-semibold "
    >
      <LogOut className="w-4 h-4" strokeWidth={1.5} />
      Sign out
    </button>
  );
}
