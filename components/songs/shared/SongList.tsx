"use client";

import React from "react";
import { Song } from "@/lib/types/domain/song";
import { SongItem } from "./SongItem";
import { DndContext, closestCenter } from "@dnd-kit/core";
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
}

export const SongList = React.memo(
  ({ songs, isSortable = false }: SongListProps) => {
    const { sensors, handleDragEnd } = useSongListDnd(songs);

    if (!isSortable) {
      return (
        <ul className="flex flex-col gap-2">
          {songs.map((song) => (
            <li
              key={song.id}
              className="flex items-start justify-between p-3 md:p-4 rounded-xl hover:bg-white dark:hover:bg-primary/10 transition-all group border border-transparent hover:border-primary/30 min-w-0"
            >
              <SongItem song={song} />
            </li>
          ))}
        </ul>
      );
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={songs.map((s) => s.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col gap-2">
            {songs.map((song) => (
              <SortableSongItem key={song.id} song={song} />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
    );
  },
);

SongList.displayName = "SongList";
