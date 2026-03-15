"use client";

import { ListPlaceholder } from "../shared/ListPlaceholder";
import { SongSearchResults } from "./SongSearchResults";
import { useSongSearch } from "@/hooks/songs/useSongSearch";
import { CircleAlert } from "lucide-react";

export const SongListData = () => {
  const { songs, status, error, observerRef } = useSongSearch();

  return (
    <div className="flex flex-col gap-4 bg-panel/40 p-4 md:p-8 rounded-xl border border-border-dark shadow-glass">
      {status === "error" && error && (
        <ListPlaceholder
          message={error instanceof Error ? error.message : String(error)}
          icon={CircleAlert}
        />
      )}

      <SongSearchResults songs={songs} />

      <div
        ref={observerRef}
        className="h-10 flex items-center justify-center pointer-events-none"
      />
    </div>
  );
};
