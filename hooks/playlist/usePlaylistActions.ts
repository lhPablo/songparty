"use client";

import { usePlaylistStore } from "@/store/usePlaylistStore";
import { savePlaylist } from "@/actions/playlist";
import { useIsMounted } from "../shared/useIsMounted";
import { useSearchParams } from "next/navigation";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";

export const usePlaylistActions = () => {
  const isMounted = useIsMounted();
  const searchParams = useSearchParams();
  const urlToken = searchParams.get(URL_TOKEN_PARAM);

  const {
    selectedSongs: selectedSongsStore,
    playlistName: playlistNameStore,
    clearPlaylist,
    isLocked: isLockedStore,
    setIsLocked,
    isSaving,
    setIsSaving,
    savedPlaylistId,
    setSavedPlaylistId,
    isShowQr: isShowQrStore,
    setIsShowQr,
  } = usePlaylistStore();

  const isOwner = isMounted ? !!urlToken : false;
  const isShowQr = isMounted ? isShowQrStore : false;
  const isLocked = isMounted ? isLockedStore : false;
  const selectedSongs = isMounted ? selectedSongsStore : [];
  const playlistName = isMounted ? playlistNameStore : "Mi lista";

  const handleGenerateQR = async () => {
    try {
      setIsSaving(true);
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
    selectedSongs,
    playlistName,
    isLocked,
    setIsLocked,
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
