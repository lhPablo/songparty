"use client";

import { useCallback } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { updatePlaylist } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";

export const usePlaylistPersistence = () => {
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const setIsSaving = usePlaylistStore((state) => state.setIsSaving);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const t = useTranslations("errors");

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
        sileo.error({ title: t("syncPlaylist") });
      } finally {
        setIsSaving(false);
      }
    },
    [savedPlaylistId, ownerToken, setIsSaving, t],
  );

  return { syncPlaylist };
};
