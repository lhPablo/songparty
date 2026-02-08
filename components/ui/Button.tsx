import { ComponentPropsWithoutRef } from "react";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  icon?: string;
  loading?: boolean;
}

export const Button = ({
  className = "",
  children,
  variant = "primary",
  icon,
  loading,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "group flex items-center justify-center gap-2 px-5 h-10 rounded-xl font-medium transition-all transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white neon-glow hover:brightness-110",
    secondary:
      "bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20",
    danger:
      "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20",
    ghost: "text-gray-400 hover:text-primary",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {icon && (
        <span
          className={`material-symbols-outlined text-xl ${loading ? "animate-spin" : "group-hover:animate-shake"}`}
        >
          {loading ? "sync" : icon}
        </span>
      )}
      <span className="leading-none">{children}</span>
    </button>
  );
};
