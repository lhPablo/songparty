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
        {/* Mobile: in the playlist the actions drop to a second row so the title gets
            the full width. Search and md+: cover | info | actions on a single row */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-x-4 md:gap-y-0 min-w-0">
          <div className="md:row-span-2 w-14 h-14 md:w-16 md:h-16 rounded-lg bg-gray-200 dark:bg-primary/10 relative overflow-hidden flex-shrink-0 flex items-center justify-center">
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
          <div
            className={`min-w-0 ${showPartyFeatures ? "col-span-2 md:col-span-1" : ""}`}
          >
            <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors break-words">
              {song.title}
            </h3>
            <p className="text-gray-300 truncate text-sm">{song.artist}</p>
          </div>
          {/* On md+ this wrapper dissolves (contents) and its children join the grid */}
          <div
            className={
              showPartyFeatures
                ? "col-span-3 flex flex-wrap items-center justify-between gap-2 md:contents"
                : "contents"
            }
          >
            <div className="flex min-w-0 md:col-start-2 md:row-start-2 md:mt-2 md:self-start empty:hidden">
              {showPartyFeatures && (
                <SongSignupControl
                  songId={song.id}
                  onToggleList={toggleSignups}
                  onExpandList={expandSignups}
                />
              )}
            </div>
            <div className="ml-auto col-start-3 md:row-start-1 md:row-span-2">
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
          </div>
        </div>
        {showPartyFeatures && (
          <SongSignupList songId={song.id} isExpanded={isSignupsExpanded} />
        )}
      </div>
    );
  },
);

SongItem.displayName = "SongItem";
