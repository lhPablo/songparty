"use client";

import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { usePlaylistPersistence } from "./usePlaylistPersistence";

export const usePlaylistActions = () => {
  const { syncPlaylist } = usePlaylistPersistence();
  const t = useTranslations("errors");

  const handleToggleLocked = async (newLocked: boolean) => {
    usePlaylistStore.getState().setIsLocked(newLocked);
    if (usePlaylistStore.getState().savedPlaylistId) {
      try {
        await syncPlaylist({ isLocked: newLocked });
      } catch {
        sileo.error({ title: t("toggleLock") });
      }
    }
  };

  return {
    handleToggleLocked,
  };
};
