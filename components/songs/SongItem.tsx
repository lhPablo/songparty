import { Song } from "@/lib/types/domain/song";
import React from "react";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  console.log("Renderizando SongItem");
  return (
    <li className="flex flex-row items-center gap-2">
      <img src={song.coverUrl} alt={song.title} />
      <div className="flex flex-col gap-2">
        <h2>{song.title}</h2>
        <p>{song.artist}</p>
      </div>
      <input type="checkbox" />
    </li>
  );
});
