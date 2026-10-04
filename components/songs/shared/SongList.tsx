"use client";

import React from "react";
import { Song } from "@/lib/types/domain/song";
import { SongItem } from "./SongItem";
import { SongRow } from "./SongRow";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { SortableSongItem } from "./SortableSongItem";
import { useSongListDnd } from "@/hooks/songs/useSongListDnd";

interface SongListProps {
  songs: Song[];
  isSortable?: boolean;
  showPartyFeatures?: boolean;
}

export const SongList = React.memo(
  ({ songs, isSortable = false, showPartyFeatures = true }: SongListProps) => {
    const { sensors, handleDragEnd } = useSongListDnd(songs);

    if (!isSortable) {
      return (
        <ul className="flex flex-col gap-2 min-w-0">
          {songs.map((song) => (
            <SongRow key={song.id}>
              <SongItem song={song} showPartyFeatures={showPartyFeatures} />
            </SongRow>
          ))}
        </ul>
      );
    }

    return (
      <DndContext
        id="song-list"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={songs.map((s) => s.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-2 min-w-0">
            {songs.map((song) => (
              <SortableSongItem
                key={song.id}
                song={song}
                showPartyFeatures={showPartyFeatures}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    );
  },
);

SongList.displayName = "SongList";
