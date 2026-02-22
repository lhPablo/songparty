"use client";

import { usePlaylistPolling } from "@/hooks/playlist/usePlaylistPolling";
import { Song } from "@/lib/types/domain/song";

interface SyncSharedPlaylistProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
}

export const SyncSharedPlaylist = (props: SyncSharedPlaylistProps) => {
  usePlaylistPolling(props);
  return null;
};
