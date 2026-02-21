"use client";

import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React from "react";
import { useSongItemActions } from "@/hooks/songs/useSongItemActions";
import { SongItemActions } from "./SongItemActions";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  const {
    imgError,
    setImgError,
    isHovered,
    setIsHovered,
    isSelected,
    useNextImage,
    handleToggle,
    isLocked,
    isOwner,
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
      <SongItemActions
        lyricsUrl={song.lyricsUrl}
        isSelected={isSelected}
        isHovered={isHovered}
        canEdit={!isLocked || isOwner}
        onToggle={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </>
  );
});

SongItem.displayName = "SongItem";
