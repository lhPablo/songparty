"use client";

import { useCallback } from "react";
import { sileo } from "sileo";
import { updatePlaylist } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";

export const usePlaylistPersistence = () => {
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const setIsSaving = usePlaylistStore((state) => state.setIsSaving);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);

  const syncPlaylist = useCallback(
    async (overrides?: {
      songs?: Song[];
      title?: string;
      isLocked?: boolean;
    }) => {
      if (!savedPlaylistId) return;

      try {
        setIsSaving(true);

        const state = usePlaylistStore.getState();
        const songs = overrides?.songs ?? state.selectedSongs;
        const title = overrides?.title ?? state.playlistName;
        const isLocked = overrides?.isLocked ?? state.isLocked;

        await updatePlaylist(
          savedPlaylistId,
          songs,
          title,
          isLocked,
          ownerToken || undefined,
        );
      } catch {
        sileo.error({ title: "Error al sincronizar la playlist" });
      } finally {
        setIsSaving(false);
      }
    },
    [savedPlaylistId, ownerToken, setIsSaving],
  );

  return { syncPlaylist };
};
