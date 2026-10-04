"use client";

import { useMemo, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { usePlaylistShareActions } from "./usePlaylistShareActions";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";

export const usePlaylistShareCard = () => {
  const savedPlaylistId = usePlaylistStore((state) => state.savedPlaylistId);
  const playlistName = usePlaylistStore((state) => state.playlistName);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const t = useTranslations("share");

  const {
    handleCopyLink: baseHandleCopyLink,
    handleNativeShare,
  } = usePlaylistShareActions();
  const [copied, setCopied] = useState(false);
  const [copiedAdmin, setCopiedAdmin] = useState(false);

  const shareUrl = useMemo(() => {
    if (savedPlaylistId && typeof window !== "undefined") {
      return `${window.location.origin}/playlist/${savedPlaylistId}`;
    }
    return "";
  }, [savedPlaylistId]);

  const adminShareUrl = useMemo(() => {
    if (savedPlaylistId && ownerToken && typeof window !== "undefined") {
      return `${window.location.origin}/playlist/${savedPlaylistId}?${URL_TOKEN_PARAM}=${ownerToken}`;
    }
    return "";
  }, [savedPlaylistId, ownerToken]);

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

  const handleCopyAdminLink = useCallback(() => {
    try {
      baseHandleCopyLink(adminShareUrl);
      setCopiedAdmin(true);
      setTimeout(() => setCopiedAdmin(false), 2000);
    } catch {
      // Error handled in hook
    }
  }, [baseHandleCopyLink, adminShareUrl]);

  const handleShareAdmin = useCallback(async () => {
    await handleNativeShare({
      title: t("adminNativeShareTitle", { name: playlistName }),
      text: t("adminNativeShareText"),
      url: adminShareUrl,
    });
  }, [handleNativeShare, playlistName, adminShareUrl, t]);

  const handleDownloadAdminToken = useCallback(() => {
    if (!adminShareUrl || typeof window === "undefined") return;

    const blob = new Blob(
      [
        `${t("adminTokenFileTitle", { name: playlistName })}\n\n${adminShareUrl}\n`,
      ],
      { type: "text/plain" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "songparty-admin-link.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [adminShareUrl, playlistName, t]);

  return {
    savedPlaylistId,
    shareUrl,
    copied,
    handleCopyLink,
    handleShare,
    adminShareUrl,
    copiedAdmin,
    handleCopyAdminLink,
    handleShareAdmin,
    handleDownloadAdminToken,
  };
};
