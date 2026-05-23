import { type ReactNode } from "react";

import { useTooltipStore } from "@/store/useTooltipStore";

interface TooltipProps {
  children: ReactNode;
  message: string;
  id: string;
  position?: "top" | "bottom";
}

export const Tooltip = ({
  children,
  message,
  id,
  position = "top",
}: TooltipProps) => {
  const { visibleTooltip, showTooltip, hideTooltip } = useTooltipStore();

  const isVisible = visibleTooltip === id;
  const opacity = isVisible ? 1 : 0;
  const translateY = isVisible ? 0 : -5;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => showTooltip(id)}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visibleTooltip === id && (
        <div
          style={{
            opacity,
            transform: `translateY(${translateY}px)`,
            transition: "opacity 0.2s ease-in-out, transform 0.2s ease-in-out",
            whiteSpace: "nowrap",
          }}
          className={`absolute right-1/2 transform -translate-x-1/2 ${
            position === "top" ? "-top-10" : "top-full mt-2"
          } p-2 bg-white border border-[#CAC4D0] rounded-lg shadow-md ${
            position === "top" ? "rounded-br-none" : "rounded-tr-none"
          }`}
        >
          <p className="font-light text-xs">{message}</p>
        </div>
      )}
    </div>
  );
};
