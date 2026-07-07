"use client";

import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";

type AuthButtonProps = {
  session: Session | null;
  compact?: boolean;
};

export function AuthButton({ session, compact = false }: AuthButtonProps) {
  if (!session?.user) {
    return (
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/workspace" })}
        className={
          compact
            ? "rounded border border-[var(--color-border)] bg-white px-3 py-2 text-sm transition hover:border-[var(--color-teal)]"
            : "rounded border border-[var(--color-border)] bg-white px-4 py-2 text-sm transition hover:border-[var(--color-teal)]"
        }
      >
        Sign in
      </button>
    );
  }

  const { user } = session;

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name ?? "User avatar"}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-teal-dim)] text-sm font-medium text-[var(--color-teal)]">
            {(user.name ?? user.email ?? "?").charAt(0).toUpperCase()}
          </span>
        )}
        {!compact && (
          <span className="hidden max-w-[140px] truncate text-sm text-[var(--color-text-muted)] lg:inline">
            {user.name ?? user.email}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="rounded border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text-muted)] transition hover:border-[var(--color-text-muted)] hover:text-[var(--color-text)]"
      >
        Sign out
      </button>
    </div>
  );
}
