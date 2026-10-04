"use client";

import { useState, useCallback } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { Song } from "@/lib/types/domain/song";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { ALLOWED_IMAGE_DOMAINS } from "@/lib/constants/images";
import { useIsMounted } from "../shared/useIsMounted";
import { usePlaylistPersistence } from "../playlist/usePlaylistPersistence";
import { useNowPlayingActions } from "../playlist/useNowPlayingActions";
import { useIsOwner } from "../playlist/useIsOwner";

export const useSongItemActions = (song: Song, isSelectedFallback = false) => {
  const [imgError, setImgError] = useState(false);
  const isMounted = useIsMounted();
  const t = useTranslations("errors");

  const addSong = usePlaylistStore((state) => state.addSong);
  const removeSong = usePlaylistStore((state) => state.removeSong);
  const isLocked = usePlaylistStore((state) => state.isLocked);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const currentSongId = usePlaylistStore((state) => state.currentSongId);
  const isOwner = useIsOwner();
  const { handleSetCurrentSong } = useNowPlayingActions();

  const isSelectedInStore = usePlaylistStore((state) =>
    state.selectedSongs.some((s) => s.id === song.id),
  );

  const isSelected = isMounted ? isSelectedInStore : isSelectedFallback;
  const isCurrentSong = isMounted && currentSongId === song.id;

  const [isActionProcessing, setIsActionProcessing] = useState(false);
  const { syncPlaylist } = usePlaylistPersistence();

  const handleToggle = useCallback(async () => {
    if (isActionProcessing) return;

    const canModify = !isLocked || !!ownerToken;
    if (!canModify) {
      sileo.warning({ title: t("lockedList") });
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
    } catch {
      sileo.error({ title: t("manageSong") });
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
    t,
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

  const handleToggleCurrentSong = useCallback(() => {
    handleSetCurrentSong(song.id);
  }, [handleSetCurrentSong, song.id]);

  return {
    imgError,
    setImgError,
    isSelected,
    useNextImage,
    handleToggle,
    isLocked,
    isOwner,
    isCurrentSong,
    handleToggleCurrentSong,
  };
};
