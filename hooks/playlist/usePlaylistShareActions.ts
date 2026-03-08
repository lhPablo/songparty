"use client";

import { useCallback } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";

export const usePlaylistShareActions = () => {
  const t = useTranslations("errors");

  const handleCopyLink = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      sileo.error({ title: t("copyLink") });
    }
  }, [t]);

  const handleNativeShare = useCallback(
    async (data: { title: string; text: string; url: string }) => {
      if (navigator.share) {
        try {
          await navigator.share(data);
        } catch (err) {
          if ((err as Error).name !== "AbortError") {
            sileo.error({ title: t("share") });
          }
        }
      }
    },
    [t],
  );

  return {
    handleCopyLink,
    handleNativeShare,
  };
};
