"use client";

import { FiBell, FiMenu } from "react-icons/fi";

import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuthStore } from "@/store/authStore";

interface AdminTopbarProps {
  onOpenSidebar: () => void;
}

export function AdminTopbar({ onOpenSidebar }: AdminTopbarProps) {
  const userData = useAuthStore((state) => state.userData);
  const firstName = userData?.name?.split(" ")[0] ?? "Admin";
  const initial = firstName[0].toUpperCase();

  return (
    <header className="mb-8 flex items-center justify-between gap-5 lg:justify-end">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Abrir menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-(--bg-card) text-(--text-title) shadow-md lg:hidden"
      >
        <FiMenu size={22} />
      </button>

      <div className="flex items-center gap-5">
        <ThemeToggle variant="admin" />

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-(--primary-orange) text-sm font-black text-white">
            {initial}
          </div>

          <span className="text-sm font-bold text-(--text-title)">{firstName}</span>
        </div>
      </div>
    </header>
  );
}