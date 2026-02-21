"use client";

import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useRouter } from "next/navigation";

export const useQRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    setError(null);

    try {
      const html5QrCode = new Html5Qrcode("qr-reader");

      const result = await html5QrCode.scanFile(file, false);

      const url = new URL(result);
      const pathParts = url.pathname.split("/").filter((part) => part !== "");

      const playlistIndex = pathParts.indexOf("playlist");
      const playlistId =
        playlistIndex !== -1
          ? pathParts[playlistIndex + 1]
          : pathParts[pathParts.length - 1];

      if (playlistId) {
        router.push(`/playlist/${playlistId}`);
      } else {
        setError("No se pudo leer el código QR correctamente");
      }
    } catch (err) {
      console.error("Error scanning QR:", err);
      setError(
        "No se pudo leer el código QR. Asegúrate de que la imagen sea clara.",
      );
    } finally {
      setIsScanning(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return {
    isScanning,
    error,
    fileInputRef,
    handleFileSelect,
    handleButtonClick,
  };
};
