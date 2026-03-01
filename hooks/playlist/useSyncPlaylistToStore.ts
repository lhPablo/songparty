"use client";

import { useEffect } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";

interface UseSyncPlaylistToStoreProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
}

export const useSyncPlaylistToStore = ({
  id,
  songs,
  isLocked,
  title,
}: UseSyncPlaylistToStoreProps) => {
  const setSongs = usePlaylistStore((state) => state.setSongs);
  const setSavedPlaylistId = usePlaylistStore(
    (state) => state.setSavedPlaylistId,
  );
  const setIsLocked = usePlaylistStore((state) => state.setIsLocked);
  const setPlaylistName = usePlaylistStore((state) => state.setPlaylistName);

  useEffect(() => {
    setSongs(songs);
    setSavedPlaylistId(id);
    setIsLocked(isLocked);
    setPlaylistName(title);
  }, [
    id,
    songs,
    isLocked,
    title,
    setSongs,
    setSavedPlaylistId,
    setIsLocked,
    setPlaylistName,
  ]);
};
