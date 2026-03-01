"use client";

import { PlaylistTitle } from "./PlaylistTitle";
import { Chip } from "@/components/ui/Chip";
import { PlaylistMetaInfo } from "./PlaylistMetaInfo";
import { Lock, Edit3, QrCode } from "lucide-react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useTranslations } from "next-intl";
import React from "react";

interface PlaylistHeaderProps {
  createdAt: string;
  expiresAt: string;
}

export const PlaylistHeader = React.memo(
  ({ createdAt, expiresAt }: PlaylistHeaderProps) => {
    const isLocked = usePlaylistStore((state) => state.isLocked);
    const t = useTranslations("playlist");

    const handleScrollToQr = () => {
      document
        .getElementById("qr-section")
        ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <div className="space-y-2 p-6 bg-[#2e1425] rounded-2xl border border-white/5 w-full">
        <div className="flex items-center justify-between gap-3">
          <PlaylistMetaInfo createdAt={createdAt} expiresAt={expiresAt} />
          <div className="flex items-center gap-3">
            {isLocked ? (
              <Chip variant="warning" icon={Lock} label={t("readOnly")} />
            ) : (
              <Chip variant="success" icon={Edit3} label={t("openList")} />
            )}
            <button
              onClick={handleScrollToQr}
              className="lg:hidden flex items-center justify-center size-9 rounded-full bg-white/5 text-white/50 hover:text-primary hover:bg-primary/10 transition-all"
              title={t("viewQR")}
            >
              <QrCode size={18} />
            </button>
          </div>
        </div>
        <PlaylistTitle />
      </div>
    );
  },
);

PlaylistHeader.displayName = "PlaylistHeader";
