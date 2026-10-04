"use client";

import { useEffect, useRef, useCallback } from "react";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/Button";
import { StatusToggle } from "@/components/ui/StatusToggle";
import { usePlaylistShareCard } from "@/hooks/playlist/usePlaylistShareCard";
import { usePlaylistActions } from "@/hooks/playlist/usePlaylistActions";
import { AdminTokenEntry } from "@/components/playlist/AdminTokenEntry";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsOwner } from "@/hooks/playlist/useIsOwner";
import { useTranslations } from "next-intl";
import {
  Share2,
  Check,
  Copy,
  Download,
  Lock,
  Users,
  ShieldAlert,
} from "lucide-react";

const PRIMARY_PINK = "#f91fb1";
const DARK_MAGENTA = "#4a213c";

const createQRCode = (data: string) =>
  new QRCodeStyling({
    width: 220,
    height: 220,
    margin: 0,
    type: "svg",
    data,
    dotsOptions: {
      type: "dots",
      gradient: {
        type: "linear",
        rotation: 45,
        colorStops: [
          { offset: 0, color: PRIMARY_PINK },
          { offset: 1, color: DARK_MAGENTA },
        ],
      },
    },
    backgroundOptions: { color: "transparent" },
    cornersSquareOptions: { color: PRIMARY_PINK, type: "extra-rounded" },
    cornersDotOptions: { color: PRIMARY_PINK, type: "dot" },
  });

interface QRViewerProps {
  playlistId: string;
}

export const QRViewer = ({ playlistId }: QRViewerProps) => {
  const {
    shareUrl,
    copied,
    handleCopyLink,
    handleShare,
    copiedAdmin,
    handleCopyAdminLink,
    handleShareAdmin,
    handleDownloadAdminToken,
  } = usePlaylistShareCard();

  const isLocked = usePlaylistStore((state) => state.isLocked);
  const isOwner = useIsOwner();
  const { handleToggleLocked } = usePlaylistActions();
  const t = useTranslations("share");

  const qrCode = useRef<QRCodeStyling | null>(null);

  const qrRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !shareUrl) return;

      if (!qrCode.current) {
        qrCode.current = createQRCode(shareUrl);
        qrCode.current.append(node);
      }
    },
    [shareUrl],
  );

  useEffect(() => {
    if (!qrCode.current || !shareUrl) return;
    qrCode.current.update({ data: shareUrl });
  }, [shareUrl]);

  const handleDownloadQR = useCallback(() => {
    if (!shareUrl) return;
    const downloadQR = new QRCodeStyling({
      width: 600,
      height: 600,
      margin: 20,
      type: "canvas",
      data: shareUrl,
      dotsOptions: {
        type: "dots",
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: PRIMARY_PINK },
            { offset: 1, color: DARK_MAGENTA },
          ],
        },
      },
      backgroundOptions: { color: "#ffffff" },
      cornersSquareOptions: { color: PRIMARY_PINK, type: "extra-rounded" },
      cornersDotOptions: { color: PRIMARY_PINK, type: "dot" },
    });
    downloadQR.download({ name: "songparty-qr", extension: "png" });
  }, [shareUrl]);

  return (
    <div className="bg-panel/40 py-8 md:py-10 lg:py-14 px-4 md:px-8 lg:px-12 rounded-2xl border border-border-dark shadow-glass w-full lg:max-w-[34rem]">
      <div className="flex flex-col items-center text-center gap-5 md:gap-6 lg:gap-8">
        <div className="space-y-2 lg:space-y-3">
          <h3 className="text-2xl lg:text-3xl font-black font-display tracking-tight text-white italic uppercase leading-none">
            {t("title")}
          </h3>
          <p className="text-[#cc8eb8] text-sm lg:text-base max-w-xs mx-auto opacity-80 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative group rounded-[2.1rem] lg:rounded-[2.6rem] overflow-hidden p-[2px]">
          {/* Spinning gradient border */}
          <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,#f91fb1_0%,transparent_40%,#4a213c_60%,#f91fb1_100%)] animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-white p-4 lg:p-6 rounded-[2rem] lg:rounded-[2.5rem] shadow-[0_0_40px_-10px_rgba(249,31,177,0.3)] overflow-hidden">
            <div className="size-52 relative flex items-center justify-center">
              {shareUrl ? (
                <div
                  ref={qrRef}
                  className="transition-transform group-hover:scale-105 duration-500 ease-out drop-shadow-[0_0_8px_rgba(249,31,177,0.2)]"
                />
              ) : (
                <div className="w-52 h-52 bg-[radial-gradient(circle_at_center,_#230f1c_3px,_transparent_3px)] bg-[size:12px_12px] opacity-20"></div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full space-y-3 lg:space-y-4 pt-4 lg:pt-6 border-t border-white/5">
          <Button
            variant="primary"
            icon={Share2}
            className="w-full h-12 lg:h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20"
            onClick={handleShare}
          >
            {t("shareInvitation")}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              icon={copied ? Check : Copy}
              className={`w-full h-11 lg:h-14 rounded-2xl font-bold transition-all duration-300 ${
                copied
                  ? "!bg-green-500 !text-white !border-green-500 [&_svg]:animate-[check-pop_0.4s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
                  : ""
              }`}
              onClick={handleCopyLink}
            >
              {copied ? t("linkCopied") : t("copyLink")}
            </Button>
            <Button
              variant="secondary"
              icon={Download}
              className="w-full h-11 lg:h-14 rounded-2xl font-bold"
              onClick={handleDownloadQR}
            >
              {t("downloadQR")}
            </Button>
          </div>

          {!isOwner && (
            <div className="pt-4 mt-2 border-t border-white/10">
              <AdminTokenEntry playlistId={playlistId} />
            </div>
          )}

          {isOwner && (
            <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-center gap-2 text-amber-400">
                <ShieldAlert size={16} />
                <span className="text-xs font-bold uppercase tracking-wide">
                  {t("adminLinkTitle")}
                </span>
              </div>
              <p className="text-[#cc8eb8] text-xs opacity-70 -mt-1">
                {t("adminLinkSubtitle")}
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="secondary"
                  icon={copiedAdmin ? Check : Copy}
                  className={`w-full h-10 rounded-xl text-xs font-bold ${
                    copiedAdmin ? "!bg-green-500 !text-white !border-green-500" : ""
                  }`}
                  onClick={handleCopyAdminLink}
                >
                  {copiedAdmin ? t("linkCopied") : t("copyAdminLink")}
                </Button>
                <Button
                  variant="secondary"
                  icon={Share2}
                  className="w-full h-10 rounded-xl text-xs font-bold"
                  onClick={handleShareAdmin}
                >
                  {t("shareAdminLink")}
                </Button>
                <Button
                  variant="secondary"
                  icon={Download}
                  className="w-full h-10 rounded-xl text-xs font-bold"
                  onClick={handleDownloadAdminToken}
                >
                  {t("downloadAdminLink")}
                </Button>
              </div>
            </div>
          )}

          {isOwner && (
            <div className="pt-2">
              <StatusToggle
                checked={isLocked}
                onChange={() => handleToggleLocked(!isLocked)}
                falseOption={{
                  label: t("collaborative"),
                  icon: Users,
                  activeBg: "bg-green-500",
                  activeShadow: "shadow-green-500/20",
                  inactiveText: "text-green-600",
                }}
                trueOption={{
                  label: t("readOnly"),
                  icon: Lock,
                  activeBg: "bg-amber-500",
                  activeShadow: "shadow-amber-500/20",
                  inactiveText: "text-amber-600",
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
