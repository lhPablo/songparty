"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSongs } from "@/lib/api/songs";
import { PaginatedSongsResponse } from "@/lib/types/domain/paginatedSongResponse";

interface UseSongsProps {
  song: string;
  author: string;
}

export const useInfiniteSongs = (query: UseSongsProps) => {
  return useInfiniteQuery({
    refetchOnWindowFocus: false,
    queryKey: ["songs", query.song, query.author],
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetchSongs({
        pageParam,
        title: query.song,
        author: query.author,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedSongsResponse) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });
};
