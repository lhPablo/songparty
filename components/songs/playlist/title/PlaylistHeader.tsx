"use client";

import { PlaylistTitle } from "./PlaylistTitle";
import { Chip } from "@/components/ui/Chip";
import { PlaylistMetaInfo } from "./PlaylistMetaInfo";
import { Lock, Edit3, QrCode, UserRound } from "lucide-react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useTranslations } from "next-intl";
import React from "react";

interface PlaylistHeaderProps {
  createdAt: string;
  expiresAt: string;
  isLocked: boolean;
  fallbackTitle?: string;
}

export const PlaylistHeader = React.memo(
  ({ createdAt, expiresAt, isLocked, fallbackTitle }: PlaylistHeaderProps) => {
    const myName = usePlaylistStore((state) => state.identity?.name ?? null);
    const t = useTranslations("playlist");

    const handleScrollToQr = () => {
      document
        .getElementById("qr-section")
        ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
      <div className="space-y-4 p-5 sm:p-6 bg-[#2e1425] rounded-2xl border border-white/5 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <PlaylistMetaInfo createdAt={createdAt} expiresAt={expiresAt} />

          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t border-white/5 sm:border-none">
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0">
                {isLocked ? (
                  <Chip variant="warning" icon={Lock} label={t("readOnly")} />
                ) : (
                  <Chip variant="success" icon={Edit3} label={t("openList")} />
                )}
              </span>
              {myName && (
                <span className="sm:order-first min-w-0">
                  <Chip
                    variant="primary"
                    icon={UserRound}
                    label={myName}
                    wrap
                  />
                </span>
              )}
            </div>

            <button
              onClick={handleScrollToQr}
              className="lg:hidden flex shrink-0 items-center justify-center size-10 rounded-full bg-white/5 text-white/50 hover:text-primary hover:bg-primary/10 transition-all border border-white/10"
              title={t("viewQR")}
            >
              <QrCode size={20} />
            </button>
          </div>
        </div>
        <PlaylistTitle fallbackTitle={fallbackTitle} />
      </div>
    );
  },
);

PlaylistHeader.displayName = "PlaylistHeader";
