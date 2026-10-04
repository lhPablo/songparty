import { ComponentProps, forwardRef } from "react";

interface SongRowProps extends ComponentProps<"li"> {
  isDragging?: boolean;
}

export const SongRow = forwardRef<HTMLLIElement, SongRowProps>(
  ({ isDragging = false, className = "", children, ...props }, ref) => {
    return (
      <li
        ref={ref}
        className={`flex items-start w-full min-w-0 p-3 md:p-4 rounded-xl group border ${
          isDragging
            ? "bg-primary/20 border-primary shadow-xl scale-[1.02] z-50 pointer-events-none"
            : "border-transparent hover:bg-primary/10 hover:border-primary/30 transition-all"
        } ${className}`}
        {...props}
      >
        {children}
      </li>
    );
  },
);

SongRow.displayName = "SongRow";
