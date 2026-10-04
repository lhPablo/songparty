import { LucideIcon } from "lucide-react";

const variantClasses = {
  success: "bg-green-500/10 text-green-600 ring-green-500/20",
  warning: "bg-amber-500/10 text-amber-600 ring-amber-500/20",
  error: "bg-red-500/10 text-red-600 ring-red-500/20",
  info: "bg-blue-500/10 text-blue-600 ring-blue-500/20",
  primary: "bg-primary/10 text-primary ring-primary/20",
};

type ChipVariant = keyof typeof variantClasses;

interface ChipProps {
  label: string;
  icon?: LucideIcon;
  variant?: ChipVariant;
}

export const Chip = ({ label, icon: Icon, variant = "info" }: ChipProps) => {
  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ring-1 min-w-0 ${variantClasses[variant]}`}
    >
      {Icon && <Icon size={14} className="shrink-0" />}
      <span className="truncate">{label}</span>
    </span>
  );
};
