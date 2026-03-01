import React from "react";
import { LucideIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface ToggleGroupProps {
  name: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export const ToggleGroup = React.memo(
  ({ name, options, value, onChange }: ToggleGroupProps) => {
    return (
      <div className="flex gap-4 p-1 rounded-2xl bg-gray-100 dark:bg-[#321629] border border-gray-200 dark:border-[#4a213c]">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <label
              key={option.value}
              className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold ${
                value === option.value
                  ? "bg-primary text-white neon-glow neon-border"
                  : "text-gray-500 dark:text-gray-400 hover:text-primary"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="hidden"
              />
              {Icon && <Icon size={20} />}
              {option.label}
            </label>
          );
        })}
      </div>
    );
  },
);

ToggleGroup.displayName = "ToggleGroup";
