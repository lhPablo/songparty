import React, { ComponentPropsWithoutRef } from "react";
import { LucideIcon, LoaderCircle } from "lucide-react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "destructive" | "transparent";
  icon?: LucideIcon;
  loading?: boolean;
}

export const Button = React.memo(
  ({
    className = "",
    children,
    variant = "primary",
    icon: Icon,
    loading,
    ...props
  }: ButtonProps) => {
    const baseClasses =
      "group flex items-center justify-center gap-1.5 md:gap-2 px-4 md:px-6 h-10 md:h-12 rounded-xl text-sm md:text-base font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-primary text-white neon-glow hover:brightness-110 border border-transparent",
      secondary:
        "bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20",
      destructive:
        "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20",
      transparent: "text-gray-400 hover:text-primary border border-transparent",
    };

    const CurrentIcon = loading ? LoaderCircle : Icon;

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${className}`}
        disabled={loading || props.disabled}
        {...props}
      >
        {CurrentIcon && (
          <CurrentIcon
            className={`size-[18px] md:size-6 shrink-0 ${loading ? "animate-spin" : ""}`}
          />
        )}
        <span className="leading-none">{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
