"use client";

import { useEffect } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";
import { SongSignup } from "@/lib/types/domain/songSignup";

interface UseSyncPlaylistToStoreProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
  currentSongId: number | null;
  signups: Record<number, SongSignup[]>;
}

export const useSyncPlaylistToStore = ({
  id,
  songs,
  isLocked,
  title,
  currentSongId,
  signups,
}: UseSyncPlaylistToStoreProps) => {
  const setSongs = usePlaylistStore((state) => state.setSongs);
  const setSavedPlaylistId = usePlaylistStore(
    (state) => state.setSavedPlaylistId,
  );
  const setIsLocked = usePlaylistStore((state) => state.setIsLocked);
  const setPlaylistName = usePlaylistStore((state) => state.setPlaylistName);
  const setCurrentSongId = usePlaylistStore((state) => state.setCurrentSongId);
  const setSignups = usePlaylistStore((state) => state.setSignups);

  useEffect(() => {
    setSongs(songs);
    setSavedPlaylistId(id);
    setIsLocked(isLocked);
    setPlaylistName(title);
    setCurrentSongId(currentSongId);
    setSignups(signups);
  }, [
    id,
    songs,
    isLocked,
    title,
    currentSongId,
    signups,
    setSongs,
    setSavedPlaylistId,
    setIsLocked,
    setPlaylistName,
    setCurrentSongId,
    setSignups,
  ]);
};
