"use client";

import { useEffect, useRef } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { useInfiniteSongs } from "./useInfiniteSongs";

export const useSongSearch = () => {
  const appliedSongQuery = useSearchStore((state) => state.appliedSongQuery);
  const appliedAuthorQuery = useSearchStore(
    (state) => state.appliedAuthorQuery,
  );
  const hasSearched = useSearchStore((state) => state.hasSearched);
  const syncLoadingState = useSearchStore((state) => state.syncLoadingState);
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

  // Synchronize loading state
  useEffect(() => {
    syncLoadingState(isFetching, songs.length);
  }, [isFetching, songs.length, syncLoadingState]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        threshold: [0, 0.5, 1.0],
        rootMargin: "200px",
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    songs,
    hasSearched,
    status,
    error,
    observerRef,
  };
};
