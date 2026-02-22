import React, { ComponentProps } from "react";
import { Search } from "lucide-react";
import { Button } from "./Button";

interface SearchInputProps extends ComponentProps<"input"> {
  onSearch?: () => void;
  buttonText?: string;
  wrapperClassName?: string;
}

export const SearchInput = React.memo(
  React.forwardRef<HTMLInputElement, SearchInputProps>(
    (
      {
        onSearch,
        buttonText = "Buscar",
        className,
        wrapperClassName,
        ...props
      },
      ref,
    ) => {
      return (
        <label
          className={`flex flex-col w-full group ${wrapperClassName || ""}`}
        >
          <div className="flex w-full items-stretch rounded-2xl h-14 bg-white dark:bg-[#4a213c] border border-primary/20 focus-within:border-primary transition-all shadow-lg overflow-hidden">
            <div className="text-primary/50 group-focus-within:text-primary flex items-center justify-center pl-4 transition-colors">
              <Search size={24} />
            </div>
            <input
              ref={ref}
              className={`form-input flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 outline-none focus:outline-none text-base px-3 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#cc8eb8] ${className || ""}`}
              type="text"
              {...props}
            />
            <div className="flex items-center p-1.5">
              <Button
                onClick={onSearch}
                type="button"
                className="h-full px-6 rounded-xl shadow-none"
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </label>
      );
    },
  ),
);

SearchInput.displayName = "SearchInput";
