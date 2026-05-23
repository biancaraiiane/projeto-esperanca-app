import {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "volunteer"
  | "donation"
  | "partner"
  | "cyan"
  | "pink"
  | "danger"
  | "outline"
  | "ghost";

type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-black transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-(--primary-blue) text-white shadow-md hover:scale-105 focus:ring-(--primary-blue)",

  secondary:
    "bg-(--bg-card) text-(--text-title) border border-(--border-light) shadow-sm hover:scale-105 focus:ring-(--primary-blue)",

  volunteer:
    "bg-gradient-to-r from-(--primary-yellow) to-(--primary-orange) text-(--primary-blue) shadow-md hover:scale-105 focus:ring-(--primary-orange)",

  donation:
    "bg-(--primary-green) text-(--primary-blue) shadow-md hover:scale-105 focus:ring-(--primary-green)",

  partner:
    "bg-gradient-to-r from-(--primary-yellow) to-(--primary-orange) text-(--primary-blue) shadow-md hover:scale-105 focus:ring-(--primary-orange)",

  cyan:
    "bg-(--primary-cyan) text-white shadow-md hover:scale-105 focus:ring-(--primary-cyan)",

  pink:
    "bg-(--primary-pink) text-white shadow-md hover:scale-105 focus:ring-(--primary-pink)",

  danger:
    "bg-(--red-danger) text-white shadow-md hover:scale-105 focus:ring-(--red-danger)",

  outline:
    "border border-(--border-light) bg-transparent text-(--text-title) hover:bg-(--bg-section) focus:ring-(--primary-blue)",

  ghost:
    "bg-transparent text-(--text-title) hover:bg-(--bg-section) focus:ring-(--primary-blue)",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[11px]",
  md: "px-5 py-3 text-xs",
  lg: "px-6 py-4 text-sm",
  xl: "px-8 py-4 text-base",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}

      <span>{isLoading ? "Carregando..." : children}</span>

      {!isLoading && rightIcon}
    </button>
  );
}