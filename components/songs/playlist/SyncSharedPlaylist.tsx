"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSyncPlaylistToStore } from "@/hooks/playlist/useSyncPlaylistToStore";
import { usePlaylistRealtime } from "@/hooks/playlist/usePlaylistRealtime";
import { usePlaylistIdentity } from "@/hooks/playlist/usePlaylistIdentity";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { Song } from "@/lib/types/domain/song";
import { SongSignup } from "@/lib/types/domain/songSignup";

interface SyncSharedPlaylistProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
  currentSongId: number | null;
  signups: Record<number, SongSignup[]>;
}

export const SyncSharedPlaylist = ({
  id,
  songs,
  isLocked,
  title,
  currentSongId,
  signups,
}: SyncSharedPlaylistProps) => {
  const searchParams = useSearchParams();
  const setOwnerToken = usePlaylistStore((state) => state.setOwnerToken);

  useEffect(() => {
    const token = searchParams.get(URL_TOKEN_PARAM);
    setOwnerToken(token);
  }, [searchParams, setOwnerToken]);

  useSyncPlaylistToStore({ id, songs, isLocked, title, currentSongId, signups });
  usePlaylistRealtime(id);
  usePlaylistIdentity(id);

  return null;
};
