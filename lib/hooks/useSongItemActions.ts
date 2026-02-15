"use client";

import { useState, useCallback } from "react";
import { Song } from "@/lib/types/domain/song";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";
import { ALLOWED_IMAGE_DOMAINS } from "@/lib/constants/images";

export const useSongItemActions = (song: Song) => {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const addSong = usePlaylistStore((state) => state.addSong);
  const removeSong = usePlaylistStore((state) => state.removeSong);
  const isSelected = usePlaylistStore((state) => state.isSongSelected(song.id));

  const handleToggle = useCallback(() => {
    if (isSelected) {
      removeSong(song.id);
    } else {
      addSong(song);
    }
  }, [isSelected, removeSong, addSong, song]);

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
  };
};
