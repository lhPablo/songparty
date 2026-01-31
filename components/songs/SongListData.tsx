import React from "react";
import { Song } from "@/lib/types/domain/song";
import { SongItem } from "./SongItem";
import { ListPlaceholder } from "./ListPlaceholder";
import { Loading } from "../ui/Loading";

interface SongListDataProps {
  songs: Song[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
}

export const SongListData = React.memo(
  ({
    songs,
    isLoading = false,
    isFetchingNextPage = false,
  }: SongListDataProps) => {
    return (
      <div className="flex flex-col gap-2">
        {songs.length > 0 && (
          <ul className="flex flex-col gap-2">
            {songs.map((song) => (
              <li
                key={song.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-white dark:hover:bg-primary/10 transition-all group border border-transparent hover:border-primary/30"
              >
                <SongItem song={song} />
              </li>
            ))}
          </ul>
        )}

        {(isLoading || isFetchingNextPage) && (
          <div className="h-20 flex items-center justify-center">
            <Loading />
          </div>
        )}

        {songs.length === 0 && !isFetchingNextPage && !isLoading && (
          <ListPlaceholder
            message="No se han encontrado canciones, aplique un filtro para empezar la búsqueda"
            icon="search_off"
          />
        )}
      </div>
    );
  },
);

SongListData.displayName = "SongListData";
