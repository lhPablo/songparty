"use client";

import { QRCodeSVG } from "qrcode.react";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";
import { usePlaylistShareActions } from "@/lib/hooks/usePlaylistShareActions";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";

export const PlaylistShareCard = () => {
  const { savedPlaylistId, setIsShowQr } = usePlaylistStore();
  const { handlePrint, handleCopyLink } = usePlaylistShareActions();
  const [copied, setCopied] = useState(false);

  const shareUrl = useMemo(() => {
    if (savedPlaylistId && typeof window !== "undefined") {
      return `${window.location.origin}/playlist/${savedPlaylistId}`;
    }
    return "";
  }, [savedPlaylistId]);

  const onCopy = async () => {
    try {
      await handleCopyLink(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Error handled in hook
    }
  };

  if (!savedPlaylistId) return null;

  return (
    <div className="bg-gradient-to-br from-[#4a213c] to-[#230f1c] p-8 rounded-3xl border border-primary/20 shadow-2xl shadow-primary/20 w-full">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-black font-display tracking-tight text-white italic uppercase">
            ¡Lista Listísima!
          </h3>
          <p className="text-[#cc8eb8] text-sm max-w-[250px] mx-auto">
            Comparte este QR con tus invitados para empezar el karaoke.
          </p>
        </div>

        <div className="bg-white p-5 rounded-[2rem] shadow-2xl group relative overflow-hidden ring-4 ring-primary/10">
          <div className="size-48 bg-white relative flex items-center justify-center">
            {shareUrl ? (
              <QRCodeSVG
                value={shareUrl}
                size={180}
                includeMargin={false}
                level="H"
                className="transition-transform group-hover:scale-110 duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#230f1c_3px,_transparent_3px)] bg-[size:12px_12px] opacity-20"></div>
            )}
          </div>
          <div className="absolute inset-0 border-8 border-white rounded-[2rem] pointer-events-none"></div>
        </div>

        <div className="w-full space-y-3 pt-2">
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              icon="print"
              className="w-full h-12 rounded-2xl"
              onClick={handlePrint}
            >
              Imprimir
            </Button>
            <Button
              variant={copied ? "primary" : "secondary"}
              icon={copied ? "check" : "content_copy"}
              className={`w-full h-12 rounded-2xl transition-all duration-300 ${copied ? "!bg-green-500 !text-white !border-green-500" : ""}`}
              onClick={onCopy}
            >
              {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>

          <Button
            className="w-full h-14 rounded-2xl uppercase tracking-widest text-sm font-black shadow-xl shadow-primary/30"
            icon="edit"
            onClick={() => setIsShowQr(false)}
          >
            Volver a editar lista
          </Button>
        </div>
      </div>
    </div>
  );
};
