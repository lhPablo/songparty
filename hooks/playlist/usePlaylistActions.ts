"use client";

import { sileo } from "sileo";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { usePlaylistPersistence } from "./usePlaylistPersistence";

export const usePlaylistActions = () => {
  const { syncPlaylist } = usePlaylistPersistence();

  const handleToggleLocked = async (newLocked: boolean) => {
    usePlaylistStore.getState().setIsLocked(newLocked);
    if (usePlaylistStore.getState().savedPlaylistId) {
      try {
        await syncPlaylist({ isLocked: newLocked });
      } catch {
        sileo.error({ title: "Error al cambiar el bloqueo" });
      }
    }
  };

  return {
    handleToggleLocked,
  };
};
