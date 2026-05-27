"use client";

import { FiCheck, FiX } from "react-icons/fi";

import { Tooltip } from "@/components/Tooltip";

interface ActionButtonsProps<T> {
  item: T;
  canApproveOrReject?: boolean;
  approveTooltip?: string;
  rejectTooltip?: string;
  tooltipIdPrefix: string;
  onApprove?: (item: T) => void;
  onReject?: (item: T) => void;
}

export function ActionButtons<T>({
  item,
  canApproveOrReject = false,
  approveTooltip = "Aprovar",
  rejectTooltip = "Rejeitar",
  tooltipIdPrefix,
  onApprove,
  onReject,
}: ActionButtonsProps<T>) {
  return (
    <div className="flex items-center justify-center gap-2">
      {canApproveOrReject && (
        <>
          <Tooltip
            id={`${tooltipIdPrefix}-approve`}
            message={approveTooltip}
            position="top"
          >
            <button
              type="button"
              onClick={() => onApprove?.(item)}
              aria-label={approveTooltip}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-[#E7F8EA] text-[#21801A] transition hover:scale-105 dark:bg-[#102A18]"
            >
              <FiCheck size={16} />
            </button>
          </Tooltip>

          <Tooltip
            id={`${tooltipIdPrefix}-reject`}
            message={rejectTooltip}
            position="top"
          >
            <button
              type="button"
              onClick={() => onReject?.(item)}
              aria-label={rejectTooltip}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-[#FFE0E0] text-[#F44336] transition hover:scale-105 dark:bg-[#341818]"
            >
              <FiX size={16} />
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
}
