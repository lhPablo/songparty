"use client";

import React, { ComponentPropsWithoutRef, useState, useCallback } from "react";
import { LucideIcon } from "lucide-react";

interface CircleButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: LucideIcon;
  hoverIcon?: LucideIcon;
  variant?: "primary" | "successful" | "destructive" | "transparent";
  hoverVariant?: "primary" | "successful" | "destructive" | "transparent";
  size?: "sm" | "md" | "lg";
  iconClassName?: string;
  hoverIconClassName?: string;
  glow?: boolean;
}

export const CircleButton = React.memo(
  ({
    icon: Icon,
    hoverIcon: HoverIcon,
    variant = "primary",
    hoverVariant,
    size = "md",
    iconClassName = "",
    hoverIconClassName = "",
    className = "",
    glow = false,
    ...props
  }: CircleButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
      if (HoverIcon || hoverVariant) setIsHovered(true);
    }, [HoverIcon, hoverVariant]);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const sizeClasses = {
      sm: "size-8",
      md: "size-10",
      lg: "size-12",
    };

    const iconSizes = {
      sm: 16,
      md: 20,
      lg: 24,
    };

    const variantClasses = {
      primary: "bg-primary text-white",
      successful: "bg-green-500 text-white shadow-green-500/20",
      destructive: "bg-red-500 text-white shadow-red-500/20",
      transparent:
        "bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-primary",
    };

    const currentVariant = isHovered && hoverVariant ? hoverVariant : variant;
    const CurrentIcon = isHovered && HoverIcon ? HoverIcon : Icon;
    const currentIconClassName =
      isHovered && hoverIconClassName ? hoverIconClassName : iconClassName;
    const glowClass = glow ? "neon-glow" : "";

    return (
      <button
        className={`flex items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95 shadow-lg ${sizeClasses[size]} ${variantClasses[currentVariant]} ${glowClass} ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <CurrentIcon size={iconSizes[size]} className={currentIconClassName} />
      </button>
    );
  },
);

CircleButton.displayName = "CircleButton";
