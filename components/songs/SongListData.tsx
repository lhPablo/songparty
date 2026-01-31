import React from "react";
import { Song } from "@/lib/types/domain/song";
import { SongItem } from "./SongItem";
import { ListPlaceholder } from "./ListPlaceholder";
import { Loading } from "../ui/Loading";
import { useSongStore } from "@/lib/store/useSongStore";

interface SongListDataProps {
  songs: Song[];
  hasSearched?: boolean;
}

export const SongListData = React.memo(
  ({ songs, hasSearched = false }: SongListDataProps) => {
    const showLoading = useSongStore((state) => state.showLoading);
    const showEmptyMessage = useSongStore((state) => state.showEmptyMessage);

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

        {showLoading && (
          <div className="h-20 flex items-center justify-center">
            <Loading />
          </div>
        )}

        {songs.length === 0 && showEmptyMessage && !showLoading && (
          <ListPlaceholder
            message={
              hasSearched
                ? "No se han encontrado canciones, prueba con otra búsqueda"
                : "Busca tus canciones favoritas para empezar la fiesta"
            }
            icon={hasSearched ? "search_off" : "library_music"}
          />
        )}
      </div>
    );
  },
);

SongListData.displayName = "SongListData";
