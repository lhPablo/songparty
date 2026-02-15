"use client";

import { useCallback } from "react";

export const usePlaylistShareActions = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyLink = useCallback((url?: string) => {
    const targetUrl = url || window.location.href;
    return navigator.clipboard
      .writeText(targetUrl)
      .then(() => {
        console.log("URL copiada:", targetUrl);
      })
      .catch((err) => {
        console.error("Error al copiar el enlace:", err);
        throw err;
      });
  }, []);

  return {
    handlePrint,
    handleCopyLink,
  };
};
