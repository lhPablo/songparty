"use client";

import { usePlaylistStore } from "@/store/usePlaylistStore";
import { savePlaylist } from "@/actions/playlist";
import { useIsMounted } from "../shared/useIsMounted";
import { useSearchParams } from "next/navigation";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { usePlaylistPersistence } from "./usePlaylistPersistence";

export const usePlaylistActions = () => {
  const isMounted = useIsMounted();
  const searchParams = useSearchParams();
  const urlToken = searchParams.get(URL_TOKEN_PARAM);
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

  const isOwner = isMounted ? !!urlToken : false;
  const isShowQr = isMounted ? isShowQrStore : false;
  const isLocked = isMounted ? isLockedStore : false;
  const playlistName = isMounted ? playlistNameStore : "Mi lista";

  const handleToggleLocked = async (newLocked: boolean) => {
    setIsLockedStore(newLocked);
    if (savedPlaylistId) {
      try {
        await syncPlaylist({ isLocked: newLocked });
      } catch (error) {
        console.error("Error al sincronizar bloqueo:", error);
      }
    }
  };

  const handleGenerateQR = async () => {
    try {
      setIsSaving(true);
      const selectedSongs = usePlaylistStore.getState().selectedSongs;
      const { playlistId, ownerToken: _ } = await savePlaylist(
        selectedSongs,
        playlistName,
        isLocked,
        savedPlaylistId,
      );
      setSavedPlaylistId(playlistId);
      setIsShowQr(true);
    } catch (error) {
      console.error("Error al guardar la playlist:", error);
      alert("No se pudo guardar la playlist. Inténtalo de nuevo.");
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
    ownerToken: urlToken,
  };
};
