"use client";

import Image from "next/image";
import { NavLink } from "@/components/ui/NavLink";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import Link from "next/link";

export const TopBar = () => {
  const selectedSongs = usePlaylistStore((state) => state.selectedSongs);
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const playlistName = usePlaylistStore((state) => state.playlistName);
  const count = selectedSongs.length;

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-gray-200 dark:border-b-[#4a213c] px-6 md:px-20 py-4 sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-50">
      <Link
        href="/"
        className="flex items-center gap-4 text-primary hover:opacity-80 transition-opacity"
      >
        <div className="size-8">
          <Image src="/logo.svg" alt="Song Party" width={32} height={32} />
        </div>
      </Link>
      <div className="flex flex-1 justify-end gap-4 md:gap-8 items-center">
        <nav className="hidden md:flex items-center gap-9">
          {savedPlaylistId && (
            <NavLink href={`/playlist/${savedPlaylistId}`}>
              {playlistName}{" "}
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
          )}
        </nav>
      </div>
    </header>
  );
};
