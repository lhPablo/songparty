"use client";

import { CircleButton } from "@/components/ui/CircleButton";
import { CircleLink } from "@/components/ui/CircleLink";

interface SongItemActionsProps {
  lyricsUrl: string;
  isSelected: boolean;
  isHovered: boolean;
  canEdit: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const SongItemActions = ({
  lyricsUrl,
  isSelected,
  isHovered,
  canEdit,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: SongItemActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <CircleLink
        href={lyricsUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Ver letra en Genius"
        variant="transparent"
        icon="lyrics"
        size="lg"
        iconClassName=""
      />
      {canEdit && (
        <CircleButton
          onClick={onToggle}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          variant={
            isSelected ? (isHovered ? "destructive" : "successful") : "primary"
          }
          icon={isSelected ? (isHovered ? "delete" : "check") : "add"}
          glow={!isSelected}
          size="lg"
          iconClassName={isSelected && isHovered ? "animate-shake" : ""}
          title={isSelected ? "Quitar de la lista" : "Añadir a la lista"}
        />
      )}
    </div>
  );
};
