import type { ApiStatus } from "@/types/api";

interface StatusBadgeProps {
  status: ApiStatus;
}

const statusLabel: Record<ApiStatus, string> = {
  PENDENTE: "Pendente",
  ACEITA: "Aceita",
  NEGADA: "Negada",
};

const statusClasses: Record<ApiStatus, string> = {
  PENDENTE:
    "bg-[#FFF4BE] text-[#D88A00] dark:border dark:border-[#A97709] dark:bg-[#2A2108] dark:text-[#F5B23C]",

  ACEITA:
    "bg-[#DFF7E5] text-[#21801A] dark:border dark:border-[#1F7A3A] dark:bg-[#102A18] dark:text-[#42D77D]",

  NEGADA:
    "bg-[#FFE0E0] text-[#F44336] dark:border dark:border-[#743333] dark:bg-[#341818] dark:text-[#FF7777]",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`
        rounded-md px-3 py-1 text-xs font-black
        ${statusClasses[status]}
      `}
    >
      {statusLabel[status]}
    </span>
  );
}