"use client";

import { ListPlaceholder } from "../shared/ListPlaceholder";
import { useInfiniteSongs } from "@/lib/hooks/useInfiniteSongs";
import { SongSearchForm } from "./SongSearchForm";
import { SongSearchResults } from "./SongSearchResults";
import { useSearchStore } from "@/lib/store/useSearchStore";

import { useEffect, useRef } from "react";

export const SongSearchSection = () => {
  const {
    appliedSongQuery,
    appliedAuthorQuery,
    hasSearched,
    syncLoadingState,
  } = useSearchStore();
  const observerRef = useRef<HTMLDivElement>(null);

  const {
    data,
    fetchNextPage,
    status,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteSongs({
    song: appliedSongQuery,
    author: appliedAuthorQuery,
  });

  const songs = data?.pages.flatMap((page) => page.data) ?? [];

  // Syncronize the state of loading with the Zustand store to handle the flash
  useEffect(() => {
    syncLoadingState(isFetching, songs.length);
  }, [isFetching, songs.length, syncLoadingState]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: [0, 0.5, 1.0],
        rootMargin: "100px",
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
