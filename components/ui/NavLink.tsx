import Link from "next/link";
import { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

export const NavLink = ({ className, ...props }: NavLinkProps) => {
  return (
    <Link
      className={`text-gray-700 dark:text-white text-sm font-medium leading-normal hover:text-primary transition-colors ${className || ""}`}
      {...props}
    />
  );
};
