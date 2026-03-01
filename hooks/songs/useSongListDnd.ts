"use client";

import {
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { Song } from "@/lib/types/domain/song";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { usePlaylistPersistence } from "../playlist/usePlaylistPersistence";

export const useSongListDnd = (songs: Song[]) => {
  const reorderSongs = usePlaylistStore((state) => state.reorderSongs);
  const { syncPlaylist } = usePlaylistPersistence();
  const t = useTranslations("errors");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = songs.findIndex((s) => s.id.toString() === active.id);
      const newIndex = songs.findIndex((s) => s.id.toString() === over.id);

      reorderSongs(oldIndex, newIndex);

      try {
        await syncPlaylist();
      } catch {
        sileo.error({ title: t("saveOrder") });
      }
    }
  };

  return {
    sensors,
    handleDragEnd,
  };
};
