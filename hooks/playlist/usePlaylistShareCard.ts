"use client";

import { useMemo, useState, useCallback } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { usePlaylistShareActions } from "./usePlaylistShareActions";

export const usePlaylistShareCard = () => {
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const playlistName = usePlaylistStore((state) => state.playlistName);

  const {
    handlePrint,
    handleCopyLink: baseHandleCopyLink,
    handleNativeShare,
  } = usePlaylistShareActions();
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (savedPlaylistId && typeof window !== "undefined") {
      return `${window.location.origin}/playlist/${savedPlaylistId}`;
    }
    return "";
  }, [savedPlaylistId]);

  const handleCopyLink = useCallback(() => {
    try {
      baseHandleCopyLink(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Error handled in hook
    }
  }, [baseHandleCopyLink, shareUrl]);

  const handleShare = useCallback(async () => {
    await handleNativeShare({
      title: `Únete a mi Song Party: ${playlistName}`,
      text: `Entra en mi lista colaborativa de karaoke y añade tus canciones favoritas.`,
      url: shareUrl,
    });
  }, [handleNativeShare, playlistName, shareUrl]);

  return {
    savedPlaylistId,
    shareUrl,
    copied,
    handlePrint,
    handleCopyLink,
    handleShare,
  };
};
