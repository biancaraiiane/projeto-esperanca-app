import type { ApiStatus } from "@/types/api";

type StatusFilter = "ALL" | ApiStatus;

interface StatusTabsProps {
  selectedStatus: StatusFilter;
  onChangeStatus: (status: StatusFilter) => void;
  counts: {
    all: number;
    pending: number;
    approved: number;
    rejected: number;
  };
}

const tabs = [
  {
    label: "Todos",
    value: "ALL",
    countKey: "all",
  },
  {
    label: "Pendentes",
    value: "PENDENTE",
    countKey: "pending",
  },
  {
    label: "Aceitos",
    value: "ACEITA",
    countKey: "approved",
  },
  {
    label: "Negados",
    value: "NEGADA",
    countKey: "rejected",
  },
] as const;

const tabBadgeClasses = {
  all: "bg-(--bg-section) text-(--text-title) dark:bg-(--bg-card-soft)",
  pending: "bg-[#FFF4BE] text-[#D88A00] dark:bg-[#2A2108] dark:text-[#F5B23C]",
  approved: "bg-[#DFF7E5] text-[#21801A] dark:bg-[#102A18] dark:text-[#42D77D]",
  rejected: "bg-[#FFE0E0] text-[#F44336] dark:bg-[#341818] dark:text-[#FF7777]",
};

export function StatusTabs({
  selectedStatus,
  onChangeStatus,
  counts,
}: StatusTabsProps) {
  return (
    <div className="mb-5 flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const isActive = selectedStatus === tab.value;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChangeStatus(tab.value)}
            className={`
              cursor-pointer rounded-t-lg border border-(--border-light) bg-(--bg-card) px-5 py-3 text-sm font-black transition dark:bg-(--bg-card)
              ${
                isActive
                  ? "text-(--primary-pink)"
                  : "text-(--text-body) hover:text-(--primary-pink)"
              }
            `}
          >
            {tab.label}

            <span
              className={`
                ml-2 rounded-md px-2 py-1 text-xs font-black
                ${tabBadgeClasses[tab.countKey]}
              `}
            >
              {counts[tab.countKey]}
            </span>
          </button>
        );
      })}
    </div>
  );
}