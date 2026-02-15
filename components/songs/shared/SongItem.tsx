"use client";

import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React from "react";
import { CircleButton } from "@/components/ui/CircleButton";
import { useSongItemActions } from "@/lib/hooks/useSongItemActions";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  const {
    imgError,
    setImgError,
    isHovered,
    setIsHovered,
    isSelected,
    useNextImage,
    handleToggle,
  } = useSongItemActions(song);

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
