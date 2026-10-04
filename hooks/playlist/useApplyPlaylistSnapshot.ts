"use client";

import { useCallback, useRef } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Playlist } from "@/lib/types/domain/playlist";

// Applies a full playlist snapshot to the store,
// ignoring snapshots older than the last one applied
export const useApplyPlaylistSnapshot = () => {
  const setSongs = usePlaylistStore((state) => state.setSongs);
  const setIsLocked = usePlaylistStore((state) => state.setIsLocked);
  const setPlaylistName = usePlaylistStore((state) => state.setPlaylistName);
  const setCurrentSongId = usePlaylistStore((state) => state.setCurrentSongId);
  const setSignups = usePlaylistStore((state) => state.setSignups);
  const lastUpdatedAtRef = useRef<string | null>(null);

  return useCallback(
    (playlist: Playlist) => {
      if (
        lastUpdatedAtRef.current &&
        playlist.updatedAt < lastUpdatedAtRef.current
      )
        return;
      lastUpdatedAtRef.current = playlist.updatedAt;

      setSongs(playlist.songs);
      setIsLocked(playlist.isLocked);
      setPlaylistName(playlist.title);
      setCurrentSongId(playlist.currentSongId);
      setSignups(playlist.signups ?? {});
    },
    [setSongs, setIsLocked, setPlaylistName, setCurrentSongId, setSignups],
  );
};
