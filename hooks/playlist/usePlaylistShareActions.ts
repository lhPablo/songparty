"use client";

import { useCallback } from "react";
import { sileo } from "sileo";

export const usePlaylistShareActions = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyLink = useCallback((url: string) => {
    try {
      navigator.clipboard.writeText(url);
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
            console.error("Error al compartir:", err);
          }
        }
      } else {
        console.warn("Web Share API no soportada en este navegador");
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
