"use client";

import { FiMoon, FiSun } from "react-icons/fi";

import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  variant?: "public" | "admin";
}

export function ThemeToggle({ variant = "public" }: ThemeToggleProps) {
  const { isDark, isMounted, toggleTheme } = useTheme();

  if (!isMounted) {
    if (variant === "admin") {
      return (
        <button
          type="button"
          disabled
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition"
          style={{ color: "var(--text-body)" }}
        >
          <span className="h-4.5 w-4.5" />
          <span>Carregando tema...</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        disabled
        aria-label="Carregando tema"
        className="flex h-9 w-9 items-center justify-center rounded-full border transition"
        style={{
          background: "var(--bg-card)",
          borderColor: "var(--border-light)",
          color: "var(--text-muted)",
        }}
      />
    );
  }

  if (variant === "admin") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition"
        style={{ color: "var(--text-body)" }}
      >
        {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
        <span>{isDark ? "Modo claro" : "Modo escuro"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      className="flex h-9 w-9 items-center justify-center rounded-full border transition hover:scale-105"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-light)",
        color: "var(--text-muted)",
      }}
    >
      {isDark ? <FiSun size={17} /> : <FiMoon size={17} />}
    </button>
  );
}