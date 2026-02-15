"use client";

import { useCallback } from "react";

export const useQrActions = () => {
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleCopyLink = useCallback((url?: string) => {
    const targetUrl = url || window.location.href;
    navigator.clipboard
      .writeText(targetUrl)
      .then(() => {
        console.log("URL copiada:", targetUrl);
        alert("¡Enlace copiado al portapapeles!");
      })
      .catch((err) => {
        console.error("Error al copiar el enlace:", err);
      });
  }, []);

  return {
    handlePrint,
    handleCopyLink,
  };
};
