"use client";

import { useState, useCallback } from "react";
import { Song } from "@/lib/types/domain/song";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { ALLOWED_IMAGE_DOMAINS } from "@/lib/constants/images";
import { useIsMounted } from "../shared/useIsMounted";
import { usePlaylistPersistence } from "../playlist/usePlaylistPersistence";

export const useSongItemActions = (song: Song) => {
  const [imgError, setImgError] = useState(false);
  const isMounted = useIsMounted();

  const addSong = usePlaylistStore((state) => state.addSong);
  const removeSong = usePlaylistStore((state) => state.removeSong);
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const isLocked = usePlaylistStore((state) => state.isLocked);
  const playlistName = usePlaylistStore((state) => state.playlistName);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);

  const isSelectedInStore = usePlaylistStore((state) =>
    state.selectedSongs.some((s) => s.id === song.id),
  );

  const isSelected = isMounted ? isSelectedInStore : false;

  const [isActionProcessing, setIsActionProcessing] = useState(false);
  const { syncPlaylist } = usePlaylistPersistence();

  const handleToggle = useCallback(async () => {
    if (isActionProcessing) return;

    const canModify = !isLocked || !!ownerToken;
    if (!canModify) {
      console.warn(
        "No tienes permiso para modificar esta lista (está bloqueada)",
      );
      return;
    }

    setIsActionProcessing(true);

    try {
      const currentState = usePlaylistStore.getState();
      const isCurrentlySelected = currentState.selectedSongs.some(
        (s) => s.id === song.id,
      );

      if (isCurrentlySelected) {
        removeSong(song.id);
      } else {
        addSong(song);
      }

      await syncPlaylist();
    } catch (error) {
      console.error("Error al gestionar la canción:", error);
    } finally {
      setIsActionProcessing(false);
    }
  }, [
    isActionProcessing,
    isLocked,
    ownerToken,
    removeSong,
    song,
    addSong,
    syncPlaylist,
  ]);

  const isAllowedDomain = useCallback((url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return ALLOWED_IMAGE_DOMAINS.some((domain) => hostname.endsWith(domain));
    } catch {
      return false;
    }
  }, []);

  const useNextImage = isAllowedDomain(song.coverUrl);

  return {
    imgError,
    setImgError,
    isSelected,
    useNextImage,
    handleToggle,
    isLocked,
    isOwner: !!ownerToken,
  };
};
