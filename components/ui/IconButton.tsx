"use client";

import React, { ComponentPropsWithoutRef } from "react";
import { LucideIcon } from "lucide-react";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: LucideIcon;
  iconClassName?: string;
}

export const IconButton = React.memo(
  ({
    icon: Icon,
    iconClassName = "",
    className = "",
    ...props
  }: IconButtonProps) => {
    return (
      <button
        className={`
        flex items-center justify-center 
        p-2 
        rounded-full 
        text-text-secondary 
        hover:text-primary 
        hover:bg-primary/5
        active:scale-90
        transition-all 
        duration-200
        shrink-0 
        ${className}
      `}
        {...props}
      >
        <Icon
          size={20}
          className={`transition-transform duration-200 ${iconClassName}`}
        />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
