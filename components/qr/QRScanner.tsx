"use client";

import { Button } from "@/components/ui/Button";
import { useQRScanner } from "@/hooks/qr/useQRScanner";
import { useTranslations } from "next-intl";
import { ScanQrCode } from "lucide-react";

export const QRScanner = () => {
  const {
    isScanning,
    error,
    fileInputRef,
    handleFileSelect,
    handleButtonClick,
  } = useQRScanner();
  const t = useTranslations("qr");

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="qr-file-input"
      />

      {/* Element hidden required for html5-qrcode */}
      <div id="qr-reader" className="hidden"></div>

      <Button
        variant="secondary"
        className="w-full h-16 text-lg font-bold rounded-2xl shadow-2xl dark:shadow-white/5"
        icon={ScanQrCode}
        onClick={handleButtonClick}
        disabled={isScanning}
      >
        {isScanning ? t("scanning") : t("joinWithQR")}
      </Button>

      {error && (
        <div className="mt-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
