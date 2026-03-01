"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSyncPlaylistToStore } from "@/hooks/playlist/useSyncPlaylistToStore";
import { usePlaylistPolling } from "@/hooks/playlist/usePlaylistPolling";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { Song } from "@/lib/types/domain/song";

interface SyncSharedPlaylistProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
}

export const SyncSharedPlaylist = ({
  id,
  songs,
  isLocked,
  title,
}: SyncSharedPlaylistProps) => {
  const searchParams = useSearchParams();
  const setOwnerToken = usePlaylistStore((state) => state.setOwnerToken);

  useEffect(() => {
    const token = searchParams.get(URL_TOKEN_PARAM);
    setOwnerToken(token);
  }, [searchParams, setOwnerToken]);

  useSyncPlaylistToStore({ id, songs, isLocked, title });
  usePlaylistPolling(id);

  return null;
};
