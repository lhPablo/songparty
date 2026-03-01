"use client";

import { PlaylistTitle } from "./PlaylistTitle";
import { Chip } from "@/components/ui/Chip";
import { PlaylistMetaInfo } from "./PlaylistMetaInfo";
import { PlaylistTools } from "./PlaylistTools";
import { Lock, Edit3 } from "lucide-react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import React from "react";

interface PlaylistHeaderProps {
  createdAt: string;
  expiresAt: string;
  playlistId: string;
}

export const PlaylistHeader = React.memo(
  ({ createdAt, expiresAt, playlistId }: PlaylistHeaderProps) => {
    const isLocked = usePlaylistStore((state) => state.isLocked);

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-3 flex-wrap">
          {isLocked ? (
            <Chip variant="warning" icon={Lock} label="Solo lectura" />
          ) : (
            <Chip variant="success" icon={Edit3} label="Lista Abierta" />
          )}
        </div>
        <PlaylistTitle />
        <PlaylistMetaInfo createdAt={createdAt} expiresAt={expiresAt} />
        <PlaylistTools playlistId={playlistId} />
      </div>
    );
  },
);

PlaylistHeader.displayName = "PlaylistHeader";
