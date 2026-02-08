import { ComponentProps } from "react";
import { Button } from "./Button";

interface SearchInputProps extends ComponentProps<"input"> {
  onSearch?: () => void;
  buttonText?: string;
  wrapperClassName?: string;
}

export const SearchInput = ({
  onSearch,
  buttonText = "Buscar",
  className,
  wrapperClassName,
  ...props
}: SearchInputProps) => {
  return (
    <label className={`flex flex-col w-full group ${wrapperClassName || ""}`}>
      <div className="flex w-full items-stretch rounded-full h-16 bg-white dark:bg-[#4a213c] border-2 border-primary transition-all shadow-xl">
        <div className="text-primary flex items-center justify-center pl-6">
          <span className="material-symbols-outlined text-3xl">search</span>
        </div>
        <input
          className={`form-input flex w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 outline-none focus:outline-none text-lg px-4 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#cc8eb8] ${className || ""}`}
          type="text"
          {...props}
        />
        <div className="flex items-center pr-2">
          <Button
            onClick={onSearch}
            type="button"
            className="h-12 px-8 rounded-full"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </label>
  );
};
