"use client";

import { Song } from "@/lib/types/domain/song";
import { SongItem } from "./SongItem";
import { SongRow } from "./SongRow";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

interface SortableSongItemProps {
  song: Song;
  showPartyFeatures?: boolean;
}

export const SortableSongItem = ({
  song,
  showPartyFeatures,
}: SortableSongItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: song.id.toString() });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SongRow ref={setNodeRef} style={style} isDragging={isDragging}>
      <div
        {...attributes}
        {...listeners}
        className="text-gray-400 hover:text-primary cursor-grab active:cursor-grabbing p-1 mr-2 shrink-0 touch-none mt-1"
      >
        <GripVertical size={24} />
      </div>
      <SongItem song={song} showPartyFeatures={showPartyFeatures} />
    </SongRow>
  );
};
