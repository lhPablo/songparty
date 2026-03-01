"use client";

import { useCallback } from "react";
import { sileo } from "sileo";

export const usePlaylistShareActions = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyLink = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      sileo.error({ title: "Error al copiar el enlace" });
    }
  }, []);

  const handleNativeShare = useCallback(
    async (data: { title: string; text: string; url: string }) => {
      if (navigator.share) {
        try {
          await navigator.share(data);
        } catch (err) {
          if ((err as Error).name !== "AbortError") {
            sileo.error({ title: "Error al compartir" });
          }
        }
      }
    },
    [],
  );

  return {
    handlePrint,
    handleCopyLink,
    handleNativeShare,
  };
};
