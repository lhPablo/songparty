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
        <SongItem key={song.id} song={song} />
      ))}
    </ul>
  );
});
