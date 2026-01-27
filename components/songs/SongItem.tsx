import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React from "react";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  console.log("Renderizando SongItem");
  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        src={song.coverUrl}
        alt={song.title}
        width={64}
        height={64}
        className="rounded-md"
      />
      <div className="flex flex-col gap-2">
        <h2>{song.title}</h2>
        <p>{song.artist}</p>
      </div>
      <input type="checkbox" />
    </div>
  );
});

SongItem.displayName = "SongItem";
