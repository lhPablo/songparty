"use client";

import { Music } from "lucide-react";

import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React from "react";
import { useSongItemActions } from "@/hooks/songs/useSongItemActions";
import { SongItemActions } from "./SongItemActions";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  const {
    imgError,
    setImgError,
    isSelected,
    useNextImage,
    handleToggle,
    isLocked,
    isOwner,
  } = useSongItemActions(song);

  return (
    <>
      <div className="flex items-start gap-3 md:gap-4 min-w-0 flex-1">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gray-200 dark:bg-primary/10 relative overflow-hidden flex-shrink-0 flex items-center justify-center">
          {!imgError ? (
            useNextImage ? (
              <Image
                src={song.coverUrl}
                alt={`Portada del álbum ${song.title}`}
                fill
                sizes="(max-width: 768px) 56px, 64px"
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
            <Music size={24} className="text-gray-400" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors break-words">
            {song.title}
          </h3>
          <p className="text-gray-300 truncate text-sm">{song.artist}</p>
        </div>
      </div>
      <SongItemActions
        lyricsUrl={song.lyricsUrl}
        isSelected={isSelected}
        canEdit={!isLocked || isOwner}
        onToggle={handleToggle}
      />
    </>
  );
});

SongItem.displayName = "SongItem";
