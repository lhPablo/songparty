"use client";

import { useEffect } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";
import { getPlaylist } from "@/actions/playlist";

const POLL_INTERVAL_MS = 5000;

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
    setSavedPlaylistId(id);
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

  useEffect(() => {
    const poll = async () => {
      if (document.visibilityState === "hidden") return;

      const playlist = await getPlaylist(id);
      if (!playlist) return;

      setSongs(playlist.songs);
      setIsLocked(playlist.isLocked);
      setPlaylistName(playlist.title);
    };

    const interval = setInterval(poll, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [id, setSongs, setIsLocked, setPlaylistName]);
};
