"use client";

import { ListPlaceholder } from "@/components/songs/ListPlaceholder";
import { useInfiniteSongs } from "@/lib/hooks/useInfiniteSongs";
import { SongSearchForm } from "@/components/songs/SongSearchForm";
import { SongListData } from "@/components/songs/SongListData";
import { useSongFilters } from "@/lib/providers/SongFilterProvider";

import { useEffect, useRef } from "react";

export const SongList = () => {
  const { appliedSongQuery, appliedAuthorQuery } = useSongFilters();
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

        {status === "success" && (
          <>
            <SongListData
              songs={songs}
              isLoading={isFetching}
              isFetchingNextPage={isFetchingNextPage}
            />

            <div
              ref={observerRef}
              className="h-20 flex items-center justify-center"
            />
          </>
        )}

        {isInitialLoading && <SongListData songs={[]} isLoading={true} />}
      </div>
    </div>
  );
};
