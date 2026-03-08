import { ComponentProps, forwardRef } from "react";

interface TitleInputProps extends ComponentProps<"input"> {
  className?: string;
}

export const TitleInput = forwardRef<HTMLInputElement, TitleInputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div className="relative flex-1 group/input">
        <input
          ref={ref}
          type="text"
          className={`
            bg-transparent 
            text-text-primary dark:text-white 
            tracking-tight 
            text-[32px] md:text-[48px] 
            font-black 
            leading-tight 
            outline-none 
            w-full 
            pb-1 
            placeholder:text-text-muted/20
            selection:bg-primary/30
            ${className}
          `}
          {...props}
        />
        <div className="absolute bottom-0 left-0 h-1 w-full bg-transparent overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-primary translate-x-[-100%] group-focus-within/input:translate-x-0 transition-transform duration-500 ease-out" />
        </div>
        <div className="absolute -bottom-px left-0 w-full h-4 bg-primary/5 blur-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    );
  },
);

TitleInput.displayName = "TitleInput";
