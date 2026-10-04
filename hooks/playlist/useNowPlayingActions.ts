"use client";

import { useCallback } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { setCurrentSong } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";

export const useNowPlayingActions = () => {
  const t = useTranslations("errors");

  const handleSetCurrentSong = useCallback(
    async (songId: number) => {
      const state = usePlaylistStore.getState();
      if (!state.savedPlaylistId || !state.ownerToken) return;

      const nextId = state.currentSongId === songId ? null : songId;
      const previousId = state.currentSongId;
      state.setCurrentSongId(nextId);

      try {
        await setCurrentSong(state.savedPlaylistId, nextId, state.ownerToken);
      } catch {
        usePlaylistStore.getState().setCurrentSongId(previousId);
        sileo.error({ title: t("setCurrentSong") });
      }
    },
    [t],
  );

  return { handleSetCurrentSong };
};
