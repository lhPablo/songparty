import { ReactNode } from "react";

interface ChipProps {
  label: string;
  icon?: string;
  variant?: "success" | "warning" | "error" | "info";
}

export const Chip = ({ label, icon, variant = "info" }: ChipProps) => {
  const variantClasses = {
    success: "bg-green-500/10 text-green-600 ring-green-500/20",
    warning: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
    error: "bg-red-500/10 text-red-600 ring-red-500/20",
    info: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
  };

  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ring-1 ${variantClasses[variant]}`}
    >
      {icon && (
        <span className="material-symbols-outlined text-sm">{icon}</span>
      )}
      {label}
    </span>
  );
};
