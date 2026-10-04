"use client";

import { Music } from "lucide-react";

import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React, { useState, useCallback } from "react";
import { useSongItemActions } from "@/hooks/songs/useSongItemActions";
import { SongItemActions } from "./SongItemActions";
import { SongSignupList } from "./SongSignupList";
import { SongSignupControl } from "./SongSignupControl";

interface SongItemProps {
  song: Song;
  showPartyFeatures?: boolean;
}

export const SongItem = React.memo(
  ({ song, showPartyFeatures = true }: SongItemProps) => {
    const {
      imgError,
      setImgError,
      isSelected,
      useNextImage,
      handleToggle,
      isLocked,
      isOwner,
      isCurrentSong,
      handleToggleCurrentSong,
      // In the playlist view every listed song belongs to the playlist, so it
      // renders as selected before the store is available
    } = useSongItemActions(song, showPartyFeatures);
    const [isSignupsExpanded, setIsSignupsExpanded] = useState(false);
    const toggleSignups = useCallback(
      () => setIsSignupsExpanded((value) => !value),
      [],
    );
    const expandSignups = useCallback(() => setIsSignupsExpanded(true), []);

    return (
      <div className="flex flex-col gap-3 flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 md:gap-4 min-w-0">
          <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
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
              {showPartyFeatures && (
                <div className="flex mt-2 empty:hidden">
                  <SongSignupControl
                    songId={song.id}
                    onToggleList={toggleSignups}
                    onExpandList={expandSignups}
                  />
                </div>
              )}
            </div>
          </div>
          <SongItemActions
            lyricsUrl={song.lyricsUrl}
            isSelected={isSelected}
            canEdit={!isLocked || isOwner}
            onToggle={handleToggle}
            isOwner={showPartyFeatures && isOwner}
            isCurrentSong={showPartyFeatures && isCurrentSong}
            onToggleCurrentSong={handleToggleCurrentSong}
          />
        </div>
        {showPartyFeatures && (
          <SongSignupList songId={song.id} isExpanded={isSignupsExpanded} />
        )}
      </div>
    );
  },
);

SongItem.displayName = "SongItem";
