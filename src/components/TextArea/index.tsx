"use client";

import type { TextareaHTMLAttributes, ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

type TextareaVariant = "default" | "modal" | "outline";

interface TextareaProps<T extends FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  variant?: TextareaVariant;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

const baseTextareaClasses =
  "w-full resize-none outline-none transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<TextareaVariant, string> = {
  default:
    "rounded-xl border border-(--border-light) bg-(--bg-card) text-(--text-body) placeholder:text-(--text-muted) focus:border-(--primary-blue)",

  modal:
    "rounded-[24px] border border-transparent bg-[#9ed8f5] text-(--primary-blue) placeholder:text-(--primary-blue) focus:border-(--primary-blue) dark:border-(--border-light) dark:bg-(--bg-input) dark:text-(--text-title) dark:placeholder:text-(--text-muted) dark:focus:border-(--primary-cyan)",

  outline:
    "rounded-xl border border-(--border-light) bg-transparent text-(--text-body) placeholder:text-(--text-muted) focus:border-(--primary-blue)",
};

const labelClasses: Record<TextareaVariant, string> = {
  default: "text-xs font-semibold text-(--text-body)",
  modal:
    "text-sm font-medium uppercase text-(--primary-blue) dark:text-(--text-body)",
  outline: "text-xs font-semibold text-(--text-body)",
};

export function Textarea<T extends FieldValues>({
  name,
  control,
  label,
  variant = "default",
  helperText,
  fullWidth = true,
  leftIcon,
  className = "",
  rows = 4,
  ...props
}: TextareaProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = Boolean(fieldState.error);
        const hasLeftIcon = Boolean(leftIcon);

        return (
          <div className={fullWidth ? "w-full" : ""}>
            {label && (
              <label
                htmlFor={name}
                className={`mb-1 block ${labelClasses[variant]}`}
              >
                {label}
              </label>
            )}

            <div className="relative">
              {leftIcon && (
                <span className="absolute left-4 top-4 flex items-center text-(--text-muted)">
                  {leftIcon}
                </span>
              )}

              <textarea
                id={name}
                rows={rows}
                {...field}
                {...props}
                className={`
                  ${baseTextareaClasses}
                  ${variantClasses[variant]}
                  ${hasLeftIcon ? "pl-11" : "px-4"}
                  py-3 text-sm
                  ${
                    hasError
                      ? "border-(--red-danger) focus:border-(--red-danger)"
                      : ""
                  }
                  ${className}
                `}
              />
            </div>

            {hasError && (
              <p className="mt-1 text-xs font-medium text-(--red-danger)">
                {fieldState.error?.message}
              </p>
            )}

            {!hasError && helperText && (
              <p className="mt-1 text-xs text-(--text-muted)">
                {helperText}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}