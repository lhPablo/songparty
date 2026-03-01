"use client";

import { useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { usePlaylistShareActions } from "./usePlaylistShareActions";

export const usePlaylistShareCard = () => {
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const playlistName = usePlaylistStore((state) => state.playlistName);
  const t = useTranslations("share");

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
      title: t("nativeShareTitle", { name: playlistName }),
      text: t("nativeShareText"),
      url: shareUrl,
    });
  }, [handleNativeShare, playlistName, shareUrl, t]);

  return {
    savedPlaylistId,
    shareUrl,
    copied,
    handlePrint,
    handleCopyLink,
    handleShare,
  };
};
