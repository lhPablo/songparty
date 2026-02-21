"use client";

import { PlaylistTitle } from "./PlaylistTitle";
import { Chip } from "@/components/ui/Chip";
import { PlaylistMetaInfo } from "./PlaylistMetaInfo";
import { PlaylistTools } from "./PlaylistTools";

interface PlaylistHeaderProps {
  isLocked: boolean;
  createdAt: string;
  playlistId: string;
}

export const PlaylistHeader = ({
  isLocked,
  createdAt,
  playlistId,
}: PlaylistHeaderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 flex-wrap">
        {isLocked ? (
          <Chip variant="warning" icon="lock" label="Solo lectura" />
        ) : (
          <Chip variant="success" icon="edit" label="Lista Abierta" />
        )}
      </div>
      <PlaylistTitle />
      <PlaylistMetaInfo createdAt={createdAt} />
      <PlaylistTools playlistId={playlistId} />
    </div>
  );
};
