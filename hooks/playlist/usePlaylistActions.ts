"use client";

import { sileo } from "sileo";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { savePlaylist } from "@/actions/playlist";
import { useIsMounted } from "../shared/useIsMounted";
import { usePlaylistPersistence } from "./usePlaylistPersistence";

export const usePlaylistActions = () => {
  const isMounted = useIsMounted();
  const { syncPlaylist } = usePlaylistPersistence();

  const playlistNameStore = usePlaylistStore((state) => state.playlistName);
  const clearPlaylist = usePlaylistStore((state) => state.clearPlaylist);
  const isLockedStore = usePlaylistStore((state) => state.isLocked);
  const setIsLockedStore = usePlaylistStore((state) => state.setIsLocked);
  const isSaving = usePlaylistStore((state) => state.isSaving);
  const setIsSaving = usePlaylistStore((state) => state.setIsSaving);
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const setSavedPlaylistId = usePlaylistStore(
    (state) => state.setSavedPlaylistId,
  );
  const isShowQrStore = usePlaylistStore((state) => state.isShowQr);
  const setIsShowQr = usePlaylistStore((state) => state.setIsShowQr);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);

  const isOwner = isMounted ? !!ownerToken : false;
  const isShowQr = isMounted ? isShowQrStore : false;
  const isLocked = isMounted ? isLockedStore : false;
  const playlistName = isMounted ? playlistNameStore : "Mi lista";

  const handleToggleLocked = async (newLocked: boolean) => {
    setIsLockedStore(newLocked);
    if (savedPlaylistId) {
      try {
        await syncPlaylist({ isLocked: newLocked });
      } catch {
        sileo.error({ title: "Error al cambiar el bloqueo" });
      }
    }
  };

  const handleGenerateQR = async () => {
    try {
      setIsSaving(true);

      if (savedPlaylistId) {
        await syncPlaylist();
      } else {
        const selectedSongs = usePlaylistStore.getState().selectedSongs;
        const { playlistId, ownerToken: newToken } = await savePlaylist(
          selectedSongs,
          playlistName,
          isLocked,
        );
        setSavedPlaylistId(playlistId);
        usePlaylistStore.getState().setOwnerToken(newToken);
      }

      setIsShowQr(true);
    } catch {
      sileo.error({ title: "No se pudo guardar la playlist" });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    playlistName,
    isLocked,
    setIsLocked: handleToggleLocked,
    isSaving,
    savedPlaylistId,
    isShowQr,
    setIsShowQr,
    clearPlaylist,
    handleGenerateQR,
    isOwner,
    ownerToken,
  };
};
