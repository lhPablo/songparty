import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React from "react";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  console.log("Renderizando SongItem");
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-cover bg-center relative overflow-hidden">
          <Image
            src={song.coverUrl}
            alt={`Portada del álbum ${song.title}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-primary transition-colors">
            {song.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center size-12 rounded-full bg-primary text-white neon-glow hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </>
  );
});

SongItem.displayName = "SongItem";
