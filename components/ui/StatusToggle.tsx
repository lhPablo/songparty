"use client";

interface ToggleOption {
  label: string;
  icon: string;
  activeBg: string;
  activeShadow: string;
  inactiveText: string;
}

interface StatusToggleProps {
  checked: boolean;
  onChange: () => void;
  trueOption: ToggleOption;
  falseOption: ToggleOption;
  className?: string;
}

export const StatusToggle = ({
  checked,
  onChange,
  trueOption,
  falseOption,
  className = "",
}: StatusToggleProps) => {
  return (
    <div
      onClick={onChange}
      className={`
        relative flex items-center gap-2 p-1 h-12 rounded-full cursor-pointer transition-all duration-500 border
        ${
          checked
            ? "bg-amber-100 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50"
            : "bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800/50"
        }
        ${className}
      `}
    >
      {/* False Option (Left) */}
      <div
        className={`
        flex items-center gap-2 px-3 h-full rounded-full transition-all duration-300
        ${!checked ? `${falseOption.activeBg} text-white shadow-lg ${falseOption.activeShadow}` : falseOption.inactiveText}
      `}
      >
        <span className="material-symbols-outlined text-[18px]">
          {falseOption.icon}
        </span>
        <span className="text-xs font-bold whitespace-nowrap">
          {falseOption.label}
        </span>
      </div>

      {/* True Option (Right) */}
      <div
        className={`
        flex items-center gap-2 px-3 h-full rounded-full transition-all duration-300
        ${checked ? `${trueOption.activeBg} text-white shadow-lg ${trueOption.activeShadow}` : trueOption.inactiveText}
      `}
      >
        <span className="material-symbols-outlined text-[18px]">
          {checked ? trueOption.icon : "lock_open"}
        </span>
        <span className="text-xs font-bold whitespace-nowrap">
          {trueOption.label}
        </span>
      </div>
    </div>
  );
};
