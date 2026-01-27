"use client";

import { Loading } from "@/components/ui/Loading";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useInfiniteSongs } from "@/lib/hooks/useInfiniteSongs";
import { SongSearchForm } from "@/components/songs/SongSearchForm";
import { SongListData } from "@/components/songs/SongListData";
import { SongSearchCount } from "@/components/songs/SongSearchCount";
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
    isFetching,
  } = useInfiniteSongs({
    song: debouncedSongQuery,
    author: debouncedAuthorQuery,
  });

  const songs = data?.pages.flatMap((page) => page.data) ?? [];
  const totalCount = data?.pages[0]?.total ?? 0;

  return (
    <div className="flex flex-col gap-4 w-full">
      <SongSearchForm />

      <div className="flex flex-col gap-4 px-4">
        {status === "error" && error && (
          <ErrorMessage error={error} reset={refetch} />
        )}

        {isFetching && <Loading />}

        {!isFetching && status === "success" && (
          <>
            <SongSearchCount count={totalCount} />
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
      </div>
    </div>
  );
};
