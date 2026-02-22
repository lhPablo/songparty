"use client";

import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/Button";
import { usePlaylistShareCard } from "@/hooks/playlist/usePlaylistShareCard";
import { useIsMounted } from "@/hooks/shared/useIsMounted";
import { Share2, Check, Copy, Printer, ArrowLeft } from "lucide-react";

export const QRViewer = () => {
  const {
    savedPlaylistId,
    shareUrl,
    copied,
    handlePrint,
    handleCopyLink,
    handleShare,
    handleClose,
  } = usePlaylistShareCard();

  const isMounted = useIsMounted();

  if (!isMounted || !savedPlaylistId) return null;

  return (
    <div className="bg-gradient-to-br from-[#4a213c] to-[#230f1c] py-8 md:py-10 lg:py-14 px-6 md:px-8 lg:px-12 rounded-[3rem] lg:rounded-[4rem] border border-primary/20 shadow-2xl shadow-primary/20 w-full max-w-[26rem] md:max-w-[28rem] lg:max-w-[34rem]">
      <div className="flex flex-col items-center text-center gap-5 md:gap-6 lg:gap-8">
        <div className="space-y-2 lg:space-y-3">
          <h3 className="text-2xl lg:text-3xl font-black font-display tracking-tight text-white italic uppercase leading-none">
            ¡Lista Listísima!
          </h3>
          <p className="text-[#cc8eb8] text-sm lg:text-base max-w-xs mx-auto opacity-80 leading-relaxed">
            Comparte este QR con tus invitados para empezar el karaoke.
          </p>
        </div>

        <div className="bg-white p-4 lg:p-6 rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl group relative overflow-hidden ring-8 ring-primary/5">
          <div className="size-36 bg-white relative flex items-center justify-center">
            {shareUrl ? (
              <QRCodeSVG
                value={shareUrl}
                size={144}
                includeMargin={false}
                level="H"
                className="transition-transform group-hover:scale-110 duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#230f1c_3px,_transparent_3px)] bg-[size:12px_12px] opacity-20"></div>
            )}
          </div>
        </div>

        <div className="w-full space-y-3 lg:space-y-4 pt-4 lg:pt-6 border-t border-white/5">
          <Button
            variant="primary"
            icon={Share2}
            className="w-full h-12 lg:h-14 rounded-2xl text-md font-bold shadow-xl shadow-primary/20 animate-pulse-subtle"
            onClick={handleShare}
          >
            Compartir Invitación
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              icon={copied ? Check : Copy}
              className={`w-full h-11 lg:h-13 rounded-2xl text-[10px] uppercase font-bold transition-all duration-300 ${copied ? "!bg-green-500 !text-white !border-green-500" : ""}`}
              onClick={handleCopyLink}
            >
              {copied ? "Enlace copiado" : "Copiar Enlace"}
            </Button>
            <Button
              variant="secondary"
              icon={Printer}
              className="w-full h-11 lg:h-13 rounded-2xl text-[10px] uppercase font-bold"
              onClick={handlePrint}
            >
              Imprimir QR
            </Button>
          </div>

          <Button
            variant="transparent"
            className="w-full h-10 lg:h-11 rounded-xl uppercase tracking-widest text-[10px] font-black text-white/40 hover:text-white"
            icon={ArrowLeft}
            onClick={handleClose}
          >
            Volver a la edición
          </Button>
        </div>
      </div>
    </div>
  );
};
