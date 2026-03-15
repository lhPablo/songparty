"use client";

import React from "react";
import { CircleButton } from "@/components/ui/CircleButton";
import { CircleLink } from "@/components/ui/CircleLink";
import { useTranslations } from "next-intl";
import { Check, Plus, MicVocal, Trash2 } from "lucide-react";

interface SongItemActionsProps {
  lyricsUrl: string;
  isSelected: boolean;
  canEdit: boolean;
  onToggle: () => void;
}

export const SongItemActions = React.memo(
  ({ lyricsUrl, isSelected, canEdit, onToggle }: SongItemActionsProps) => {
    const t = useTranslations("songs");

    return (
      <div className="flex items-center gap-3 shrink-0">
        <CircleLink
          href={lyricsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title={t("viewLyrics")}
          variant="transparent"
          icon={MicVocal}
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
