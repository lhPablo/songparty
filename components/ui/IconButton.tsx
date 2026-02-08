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
      className={`flex items-center justify-center p-1 rounded-full text-gray-400 hover:text-primary transition-all shrink-0 ${className}`}
      {...props}
    >
      <span className={`material-symbols-outlined text-2xl ${iconClassName}`}>
        {icon}
      </span>
    </button>
  );
};
