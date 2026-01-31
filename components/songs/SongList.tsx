"use client";

import { ListPlaceholder } from "@/components/songs/ListPlaceholder";
import { Loading } from "@/components/ui/Loading";
import { useInfiniteSongs } from "@/lib/hooks/useInfiniteSongs";
import { SongSearchForm } from "@/components/songs/SongSearchForm";
import { SongListData } from "@/components/songs/SongListData";
import { useSongFilters } from "@/lib/providers/SongFilterProvider";

import { useEffect, useRef } from "react";

export const SongList = () => {
  const { debouncedSongQuery, debouncedAuthorQuery } = useSongFilters();
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
    song: debouncedSongQuery,
    author: debouncedAuthorQuery,
  });

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

  const songs = data?.pages.flatMap((page) => page.data) ?? [];
  const isInitialLoading = status === "pending" && isFetching;

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

        {isInitialLoading && (
          <div className="h-20 flex items-center justify-center">
            <Loading />
          </div>
        )}

        {status === "success" && (
          <>
            <SongListData songs={songs} />

            <div
              ref={observerRef}
              className="h-20 flex items-center justify-center"
            >
              {isFetchingNextPage && <Loading />}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
