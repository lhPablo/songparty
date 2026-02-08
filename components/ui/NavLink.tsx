"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

type NavLinkProps = ComponentProps<typeof Link>;

export const NavLink = ({ className, href, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const hrefString = typeof href === "string" ? href : href.pathname || "";
  const isActive = pathname === hrefString;

  return (
    <Link
      href={href}
      className={`group relative text-sm font-medium leading-normal transition-all duration-300 ${
        isActive
          ? "text-primary font-bold"
          : "text-gray-700 dark:text-white hover:text-primary"
      } ${className || ""}`}
      {...props}
    >
      {props.children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300 origin-left ${
          isActive
            ? "w-full shadow-[0_0_8px_var(--color-primary)]"
            : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
};
