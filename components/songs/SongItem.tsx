import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React, { useState } from "react";
import { ALLOWED_IMAGE_DOMAINS } from "@/lib/constants/images";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  console.log("Renderizando SongItem");
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addSong = usePlaylistStore((state) => state.addSong);
  const removeSong = usePlaylistStore((state) => state.removeSong);
  const isSelected = usePlaylistStore((state) => state.isSongSelected(song.id));

  const handleToggle = () => {
    if (isSelected) {
      removeSong(song.id);
    } else {
      addSong(song);
    }
  };

  // Check if domain is allowed for next/image
  const isAllowedDomain = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return ALLOWED_IMAGE_DOMAINS.some((domain) => hostname.endsWith(domain));
    } catch {
      return false;
    }
  };

  const useNextImage = isAllowedDomain(song.coverUrl);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-gray-200 dark:bg-primary/10 relative overflow-hidden flex items-center justify-center">
          {!imgError ? (
            useNextImage ? (
              <Image
                src={song.coverUrl}
                alt={`Portada del álbum ${song.title}`}
                fill
                sizes="56px"
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={song.coverUrl}
                alt={`Portada del álbum ${song.title}`}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            )
          ) : (
            <span className="material-symbols-outlined text-gray-400">
              music_note
            </span>
          )}
        </div>
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-primary transition-colors">
            {song.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex items-center justify-center size-12 rounded-full text-white transition-all 
            ${
              isSelected
                ? "bg-green-500 hover:bg-red-500 hover:scale-110 active:scale-95 shadow-lg shadow-green-500/20 hover:shadow-red-500/20"
                : "bg-primary neon-glow hover:scale-110 active:scale-95"
            }`}
          title={isSelected ? "Quitar de la lista" : "Añadir a la lista"}
        >
          <span className="material-symbols-outlined">
            {isSelected ? (isHovered ? "close" : "check") : "add"}
          </span>
        </button>
      </div>
    </>
  );
});

SongItem.displayName = "SongItem";
