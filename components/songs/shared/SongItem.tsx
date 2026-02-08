import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React, { useState } from "react";
import { ALLOWED_IMAGE_DOMAINS } from "@/lib/constants/images";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";

import { CircleButton } from "@/components/ui/CircleButton";

export const SongItem = React.memo(({ song }: { song: Song }) => {
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
        <CircleButton
          onClick={handleToggle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          variant={isSelected ? (isHovered ? "danger" : "success") : "primary"}
          icon={isSelected ? (isHovered ? "delete" : "check") : "add"}
          glow={!isSelected}
          size="lg"
          iconClassName={isSelected && isHovered ? "animate-shake" : ""}
          title={isSelected ? "Quitar de la lista" : "Añadir a la lista"}
        />
      </div>
    </>
  );
});

SongItem.displayName = "SongItem";
