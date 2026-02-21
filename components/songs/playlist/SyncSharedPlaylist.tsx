"use client";

import { useSyncSharedPlaylist } from "@/hooks/playlist/useSyncSharedPlaylist";
import { Song } from "@/lib/types/domain/song";

interface SyncSharedPlaylistProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
  ownerToken?: string;
}

export const SyncSharedPlaylist = (props: SyncSharedPlaylistProps) => {
  useSyncSharedPlaylist(props);
  return null;
};
