"use client";

import { useState, useCallback } from "react";
import { Song } from "@/lib/types/domain/song";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { ALLOWED_IMAGE_DOMAINS } from "@/lib/constants/images";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { useIsMounted } from "../shared/useIsMounted";
import { useSearchParams } from "next/navigation";

export const useSongItemActions = (song: Song) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMounted = useIsMounted();

  const addSong = usePlaylistStore((state) => state.addSong);
  const removeSong = usePlaylistStore((state) => state.removeSong);
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const isLocked = usePlaylistStore((state) => state.isLocked);
  const selectedSongs = usePlaylistStore((state) => state.selectedSongs);
  const playlistName = usePlaylistStore((state) => state.playlistName);

  const searchParams = useSearchParams();
  const ownerToken = searchParams.get(URL_TOKEN_PARAM);

  const isSelectedInStore = usePlaylistStore((state) =>
    state.selectedSongs.some((s) => s.id === song.id),
  );

  const isSelected = isMounted ? isSelectedInStore : false;

  const handleToggle = useCallback(async () => {
    const canModify = !isLocked || !!ownerToken;

    if (!canModify) {
      console.warn(
        "No tienes permiso para modificar esta lista (está bloqueada)",
      );
      return;
    }

    if (isSelectedInStore) {
      removeSong(song.id);
    } else {
      addSong(song);
    }

    if (savedPlaylistId && isMounted) {
      try {
        const { updatePlaylist } = await import("@/actions/playlist");
        const newSongs = isSelectedInStore
          ? selectedSongs.filter((s) => s.id !== song.id)
          : [...selectedSongs, song];

        await updatePlaylist(
          savedPlaylistId,
          newSongs,
          playlistName,
          isLocked,
          ownerToken || undefined,
        );
      } catch (error) {
        console.error(
          "Error al sincronizar con la playlist compartida:",
          error,
        );
      }
    }
  }, [
    isLocked,
    ownerToken,
    isSelectedInStore,
    removeSong,
    song,
    addSong,
    savedPlaylistId,
    isMounted,
    selectedSongs,
    playlistName,
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
    isHovered,
    setIsHovered,
    isSelected,
    useNextImage,
    handleToggle,
    isLocked,
    isOwner: !!ownerToken,
  };
};
