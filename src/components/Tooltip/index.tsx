"use client";

import { type ReactNode } from "react";

import { useTooltipStore } from "@/store/useTooltipStore";

interface TooltipProps {
  children: ReactNode;
  message: string;
  id: string;
  position?: "top" | "bottom";
}

export function Tooltip({
  children,
  message,
  id,
  position = "top",
}: TooltipProps) {
  const { visibleTooltip, showTooltip, hideTooltip } = useTooltipStore();

  const isVisible = visibleTooltip === id;
  const opacity = isVisible ? 1 : 0;
  const translateY = isVisible ? 0 : -5;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => showTooltip(id)}
      onMouseLeave={hideTooltip}
    >
      {children}

      {isVisible && (
        <div
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
            whiteSpace: "nowrap",
          }}
          className={`
            absolute right-1/2 z-50 -translate-x-1/2
            ${
              position === "top" ? "-top-10" : "top-full mt-2"
            }
            rounded-lg border border-[#CAC4D0] bg-white p-2 text-(--text-title) shadow-md
            dark:border-(--border-light) dark:bg-(--bg-card-soft) dark:text-(--text-body)
            ${position === "top" ? "rounded-br-none" : "rounded-tr-none"}
          `}
        >
          <p className="text-xs font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}