"use client";

import React from "react";
import { CircleButton } from "@/components/ui/CircleButton";
import { CircleLink } from "@/components/ui/CircleLink";
import { NowPlayingIndicator } from "./NowPlayingIndicator";
import { useTranslations } from "next-intl";
import { Check, Plus, ScrollText, Trash2, Radio } from "lucide-react";

interface SongItemActionsProps {
  lyricsUrl: string;
  isSelected: boolean;
  canEdit: boolean;
  onToggle: () => void;
  isOwner?: boolean;
  isCurrentSong?: boolean;
  onToggleCurrentSong?: () => void;
}

export const SongItemActions = React.memo(
  ({
    lyricsUrl,
    isSelected,
    canEdit,
    onToggle,
    isOwner,
    isCurrentSong,
    onToggleCurrentSong,
  }: SongItemActionsProps) => {
    const t = useTranslations("songs");

    return (
      <div className="flex items-center gap-3 shrink-0">
        {isOwner ? (
          <CircleButton
            onClick={onToggleCurrentSong}
            variant={isCurrentSong ? "successful" : "transparent"}
            icon={Radio}
            size="lg"
            title={
              isCurrentSong ? t("unmarkCurrentSong") : t("markCurrentSong")
            }
          >
            {isCurrentSong ? (
              <NowPlayingIndicator barClassName="bg-white" />
            ) : undefined}
          </CircleButton>
        ) : (
          isCurrentSong && (
            <div className="flex items-center justify-center rounded-full size-9 md:size-12 bg-primary/10">
              <NowPlayingIndicator />
            </div>
          )
        )}
        <CircleLink
          href={lyricsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={t("viewLyrics")}
          variant="transparent"
          icon={ScrollText}
          size="lg"
        />
        {canEdit && (
          <CircleButton
            onClick={onToggle}
            variant={isSelected ? "successful" : "primary"}
            hoverVariant={isSelected ? "destructive" : undefined}
            icon={isSelected ? Check : Plus}
            hoverIcon={isSelected ? Trash2 : undefined}
            glow={!isSelected}
            size="lg"
            hoverIconClassName={isSelected ? "animate-shake" : ""}
            title={isSelected ? t("removeFromList") : t("addToList")}
          />
        )}
      </div>
    );
  },
);

SongItemActions.displayName = "SongItemActions";
