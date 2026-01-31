import { Song } from "@/lib/types/domain/song";
import { SongItem } from "./SongItem";
import React from "react";

interface SongListDataProps {
  songs: Song[];
}

export const SongListData = React.memo(({ songs }: SongListDataProps) => {
  console.log("Renderizando SongListData");
  return (
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
  );
});

SongListData.displayName = "SongListData";
