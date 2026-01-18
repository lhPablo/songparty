'use client';

import { Loading } from "@/components/Loading";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useInfiniteSongs } from "@/lib/hooks/useInfiniteSongs";
import { SongSearchForm } from "@/components/songs/SongSearchForm";
import { SongListData } from "@/components/songs/SongListData";
import { useSongFilters } from "@/lib/providers/SongFilterProvider";

export const SongList = () => {
  const { debouncedSongQuery, debouncedAuthorQuery } = useSongFilters();
  console.log("Renderizando SongList");
  const {
    data,
    refetch,
    fetchNextPage,
    status,
    error,
    hasNextPage,
    isFetching
  } = useInfiniteSongs({
    song: debouncedSongQuery,
    author: debouncedAuthorQuery,
  });

  const songs = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <section className="flex flex-col gap-4">
      <SongSearchForm />

      {status === "error" && error && <ErrorMessage error={error} reset={refetch} />}

      {isFetching && <Loading />}

      {!isFetching && status === "success" && (
        <>
          <SongListData songs={songs} />

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              ...More
            </button>
          )}
        </>
      )}
    </section>
  );
};
