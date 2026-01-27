import { ComponentProps } from "react";

export const Button = ({
  className,
  children,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={`flex min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] neon-glow hover:brightness-110 transition-all ${className || ""}`}
      {...props}
    >
      {children}
    </button>
  );
};
