"use client";

import { useCallback } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsMounted } from "../shared/useIsMounted";
import { Song } from "@/lib/types/domain/song";

export const usePlaylistPersistence = () => {
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const setIsSaving = usePlaylistStore((state) => state.setIsSaving);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const isMounted = useIsMounted();

  const syncPlaylist = useCallback(
    async (overrides?: {
      songs?: Song[];
      title?: string;
      isLocked?: boolean;
    }) => {
      if (!savedPlaylistId || !isMounted) return;

      try {
        setIsSaving(true);
        const { updatePlaylist } = await import("@/actions/playlist");

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
      } catch (error) {
        console.error("Error al persistir la lista:", error);
        throw error;
      } finally {
        setIsSaving(false);
      }
    },
    [savedPlaylistId, isMounted, ownerToken, setIsSaving],
  );

  return { syncPlaylist };
};
