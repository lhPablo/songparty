"use client";

import { ListPlaceholder } from "../shared/ListPlaceholder";
import { SongSearchForm } from "./SongSearchForm";
import { SongSearchResults } from "./SongSearchResults";
import { useSongSearch } from "@/hooks/songs/useSongSearch";

export const SongSearchSection = () => {
  const { songs, hasSearched, status, error, observerRef } = useSongSearch();

  return (
    <div className="flex flex-col gap-4 w-full">
      <SongSearchForm />

      <div className="flex flex-col gap-4 px-4">
        {status === "error" && error && (
          <ListPlaceholder
            message={error instanceof Error ? error.message : String(error)}
            icon="error"
          />
        )}

        <SongSearchResults songs={songs} hasSearched={hasSearched} />

        <div
          ref={observerRef}
          className="h-10 flex items-center justify-center pointer-events-none"
        />
      </div>
    </div>
  );
};
