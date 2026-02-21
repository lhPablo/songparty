"use client";

import { ComponentPropsWithoutRef } from "react";

interface CircleButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: string;
  variant?: "primary" | "successful" | "destructive" | "transparent";
  size?: "sm" | "md" | "lg";
  iconClassName?: string;
  glow?: boolean;
}

export const CircleButton = ({
  icon,
  variant = "primary",
  size = "md",
  iconClassName = "",
  className = "",
  glow = false,
  ...props
}: CircleButtonProps) => {
  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
  };

  const variantClasses = {
    primary: "bg-primary text-white",
    successful: "bg-green-500 text-white shadow-green-500/20",
    destructive: "bg-red-500 text-white shadow-red-500/20",
    transparent: "bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-primary",
  };

  const glowClass = glow ? "neon-glow" : "";

  return (
    <button
      className={`flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg ${sizeClasses[size]} ${variantClasses[variant]} ${glowClass} ${className}`}
      {...props}
    >
      <span className={`material-symbols-outlined ${iconClassName}`}>
        {icon}
      </span>
    </button>
  );
};
