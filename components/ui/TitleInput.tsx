import { ComponentProps, forwardRef } from "react";

interface TitleInputProps extends ComponentProps<"input"> {
  className?: string;
}

export const TitleInput = forwardRef<HTMLInputElement, TitleInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={`bg-transparent border-b-2 border-primary text-gray-900 dark:text-white tracking-tight text-[32px] md:text-[40px] font-bold leading-tight outline-none w-full pb-1 animate-in fade-in duration-300 ${className}`}
        {...props}
      />
    );
  },
);

TitleInput.displayName = "TitleInput";
