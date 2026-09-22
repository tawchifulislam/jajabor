"use client";

import { PenLine } from "lucide-react";
import { signIn } from "@/lib/auth-client";

export default function AddInviteNote({ isLoggedIn }) {
  if (isLoggedIn) return null;

  return (
    <div className="mb-8 inline-flex items-center gap-2 rounded-lg border border-dashed border-accent/50 bg-accent/10 px-4 py-2.5 text-sm text-ink">
      <PenLine className="h-4 w-4 shrink-0 text-accent" />
      <span>
        Know a place worth visiting?{" "}
        <button
          onClick={() => signIn.social({ provider: "google", callbackURL: "/add" })}
          className="font-medium text-brand"
        >
          Sign in to add it
        </button>
      </span>
    </div>
  );
}