"use client";

import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";

export const TopBar = () => {
  const selectedSongs = usePlaylistStore((state) => state.selectedSongs);
  const count = selectedSongs.length;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 dark:border-b-[#4a213c] px-6 md:px-20 py-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-4 text-primary">
        <div className="size-8">
          <Image
            src="/logo.svg"
            alt="Song Party Party"
            width={32}
            height={32}
          />
        </div>
        <h2 className="text-gray-900 dark:text-white text-xl font-bold leading-tight tracking-[-0.015em]">
          Song Party
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
        <nav className="hidden md:flex items-center gap-9">
          <NavLink href="/">Buscador</NavLink>
          <NavLink href="/playlist">
            Mi Lista{" "}
            <span>
              (
              <span
                key={count}
                className="inline-block text-primary font-bold p-1 transition-all duration-300 
                animate-bounce-short"
              >
                {count}
              </span>
              )
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
