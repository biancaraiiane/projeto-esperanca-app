"use client";

import { FiAlertTriangle, FiX } from "react-icons/fi";

import { Button } from "@/components/Button";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "success" | "default";
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const iconClasses = {
  danger: "bg-[#FFE0E0] text-[#F44336] dark:bg-[#341818] dark:text-[#FF7777]",
  success: "bg-[#DFF7E5] text-[#21801A] dark:bg-[#102A18] dark:text-[#42D77D]",
  default: "bg-(--bg-section) text-(--primary-blue) dark:bg-(--bg-card-soft)",
};

const confirmVariant = {
  danger: "danger",
  success: "cyan",
  default: "primary",
} as const;

export function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  isLoading = false,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-300 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-105 rounded-3xl border border-(--border-light) bg-(--bg-card) px-6 py-7 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Fechar modal"
          className="absolute right-5 top-5 cursor-pointer text-(--text-muted) transition hover:scale-110 hover:text-(--text-title) disabled:cursor-not-allowed disabled:opacity-50"
        >
          <FiX size={22} />
        </button>

        <div
          className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${iconClasses[variant]}`}
        >
          <FiAlertTriangle size={28} />
        </div>

        <h2 className="pr-8 text-xl font-black text-(--text-title)">
          {title}
        </h2>

        <p className="mt-3 text-sm font-medium leading-relaxed text-(--text-body)">
          {description}
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant={confirmVariant[variant]}
            size="md"
            onClick={onConfirm}
            isLoading={isLoading}
            className="cursor-pointer"
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}