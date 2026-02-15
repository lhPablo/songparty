"use client";

import { ComponentPropsWithoutRef } from "react";

interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon: string;
  iconClassName?: string;
}

export const IconButton = ({
  icon,
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
      <span
        className={`material-symbols-outlined text-[24px] transition-transform duration-200 ${iconClassName}`}
      >
        {icon}
      </span>
    </button>
  );
};
