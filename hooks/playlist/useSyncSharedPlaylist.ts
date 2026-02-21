"use client";

import { useEffect } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";

interface UseSyncSharedPlaylistProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
  ownerToken?: string;
}

export const useSyncSharedPlaylist = ({
  id,
  songs,
  isLocked,
  title,
  ownerToken,
}: UseSyncSharedPlaylistProps) => {
  const { setSongs, setSavedPlaylistId, setIsLocked, setPlaylistName } =
    usePlaylistStore();

  useEffect(() => {
    setSongs(songs);
    setSavedPlaylistId(id, ownerToken);
    setIsLocked(isLocked);
    setPlaylistName(title);
  }, [
    id,
    songs,
    isLocked,
    title,
    ownerToken,
    setSongs,
    setSavedPlaylistId,
    setIsLocked,
    setPlaylistName,
  ]);
};
