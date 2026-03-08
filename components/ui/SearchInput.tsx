import React, { ComponentProps } from "react";
import { Search, LucideIcon } from "lucide-react";
import { Button } from "./Button";

interface SearchInputProps extends ComponentProps<"input"> {
  onSearch?: () => void;
  buttonText?: string;
  wrapperClassName?: string;
  icon?: LucideIcon;
  showButton?: boolean;
  label?: string;
}

export const SearchInput = React.memo(
  React.forwardRef<HTMLInputElement, SearchInputProps>(
    (
      {
        onSearch,
        buttonText = "Buscar",
        className,
        wrapperClassName,
        icon: Icon = Search,
        showButton = true,
        label,
        ...props
      },
      ref,
    ) => {
      return (
        <label
          className={`flex flex-col w-full group ${wrapperClassName || ""}`}
        >
          {label && (
            <span className="text-primary text-sm font-bold uppercase tracking-widest px-1 mb-2">
              {label}
            </span>
          )}
          <div className="flex w-full items-stretch rounded-lg h-14 bg-player border border-border-dark focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all overflow-hidden">
            <div className="text-text-muted group-focus-within:text-primary flex items-center justify-center pl-4 transition-colors">
              <Icon size={20} />
            </div>
            <input
              ref={ref}
              className={`form-input flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 outline-none focus:outline-none text-sm px-3 text-text-primary dark:text-white placeholder:text-text-muted ${className || ""}`}
              type="text"
              {...props}
            />

            {showButton && (
              <div className="flex items-center p-1.5">
                <Button
                  onClick={onSearch}
                  type="button"
                  className="h-full px-6 rounded-xl shadow-none"
                >
                  {buttonText}
                </Button>
              </div>
            )}
          </div>
        </label>
      );
    },
  ),
);

SearchInput.displayName = "SearchInput";
