"use client";

import { Song } from "@/lib/types/domain/song";
import { SongItem } from "./SongItem";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableSongItemProps {
  song: Song;
}

export const SortableSongItem = ({ song }: SortableSongItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center p-3 md:p-4 rounded-xl group border
        ${
          isDragging
            ? "bg-white dark:bg-primary/20 border-primary shadow-xl scale-[1.02] z-50 pointer-events-none"
            : "hover:bg-white dark:hover:bg-primary/10 border-transparent hover:border-primary/30 transition-all"
        }
      `}
    >
      <div
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-primary cursor-grab active:cursor-grabbing p-1 mr-2 shrink-0 touch-none"
      >
        <GripVertical size={24} />
      </div>
      <div className="flex items-center justify-between flex-1 w-full">
        <SongItem song={song} />
      </div>
    </li>
  );
};
