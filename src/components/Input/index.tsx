"use client";

import { useState, type InputHTMLAttributes, type ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

type InputVariant =
  | "default"
  | "login"
  | "authDark"
  | "modal"
  | "soft"
  | "outline";

type InputSize = "sm" | "md" | "lg";

interface InputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name" | "size"
> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: string;
  fullWidth?: boolean;
  isPassword?: boolean;
  mask?: (value: string) => string;
}

const baseInputClasses =
  "w-full outline-none transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<InputVariant, string> = {
  default:
    "rounded-md border border-(--border-light) bg-(--bg-card) text-(--text-body) placeholder:text-(--text-muted) focus:border-(--primary-blue)",

  login:
    "rounded-full border border-transparent bg-[#FFF4BE] text-black placeholder:text-black/70 focus:border-(--primary-orange) dark:bg-(--bg-input) dark:text-(--text-title) dark:placeholder:text-(--text-muted) dark:focus:border-(--primary-cyan)",

  authDark:
    "rounded-2xl border border-(--border-light) bg-(--bg-input) text-(--text-title) placeholder:text-(--text-muted) focus:border-(--primary-cyan)",

  modal:
    "rounded-full border border-transparent bg-[#9ED8F5] text-(--primary-blue) placeholder:text-(--primary-blue) focus:border-(--primary-blue) dark:bg-(--bg-input) dark:text-(--text-title) dark:placeholder:text-(--text-muted) dark:focus:border-(--primary-cyan)",

  soft: "rounded-full border border-transparent bg-(--bg-section) text-(--text-body) placeholder:text-(--text-muted) focus:border-(--primary-blue)",

  outline:
    "rounded-xl border border-(--border-light) bg-transparent text-(--text-body) placeholder:text-(--text-muted) focus:border-(--primary-blue)",
};

const sizeClasses: Record<InputSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-14 px-6 text-base",
};

const labelClasses: Record<InputVariant, string> = {
  default: "text-xs font-semibold text-(--text-body)",
  login: "text-sm font-semibold text-(--text-title)",
  authDark: "text-sm font-semibold text-(--text-title)",
  modal:
    "text-sm font-medium uppercase text-(--primary-blue) dark:text-(--text-body)",
  soft: "text-xs font-semibold text-(--text-body)",
  outline: "text-xs font-semibold text-(--text-body)",
};

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  variant = "default",
  size = "md",
  leftIcon,
  rightIcon,
  helperText,
  fullWidth = true,
  className = "",
  isPassword = false,
  type = "text",
  mask,
  ...props
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const hasError = Boolean(fieldState.error);
        const hasRightIcon = Boolean(rightIcon || isPassword);

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
                <span className="absolute left-4 top-1/2 flex -translate-y-1/2 items-center text-(--text-muted)">
                  {leftIcon}
                </span>
              )}

              <input
                id={name}
                {...field}
                {...props}
                value={mask ? mask(field.value ?? "") : (field.value ?? "")}
                type={inputType}
                className={`
                  ${baseInputClasses}
                  ${variantClasses[variant]}
                  ${sizeClasses[size]}
                  ${leftIcon ? "pl-11" : ""}
                  ${hasRightIcon ? "pr-11" : ""}
                  ${
                    hasError
                      ? "border-(--red-danger) focus:border-(--red-danger)"
                      : ""
                  }
                  ${className}
                `}
              />

              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                  className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-(--text-muted) transition hover:text-(--text-title)"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              ) : (
                rightIcon && (
                  <span className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center text-(--text-muted)">
                    {rightIcon}
                  </span>
                )
              )}
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
