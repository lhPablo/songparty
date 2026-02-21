"use client";

import { useEffect, useRef } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";
import { getPlaylist } from "@/actions/playlist";

const POLL_INTERVAL_MS = 5000;
const INACTIVITY_THRESHOLD_MS = 3 * 60 * 1000; // 3 minutes
const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  "keydown",
  "click",
  "touchstart",
  "scroll",
];

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
  const lastActivityRef = useRef(Date.now());

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
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    ACTIVITY_EVENTS.forEach((event) =>
      window.addEventListener(event, handleActivity, { passive: true }),
    );

    const poll = async () => {
      if (document.visibilityState === "hidden") return;
      if (Date.now() - lastActivityRef.current > INACTIVITY_THRESHOLD_MS)
        return;

      const playlist = await getPlaylist(id);
      if (!playlist) return;

      setSongs(playlist.songs);
      setIsLocked(playlist.isLocked);
      setPlaylistName(playlist.title);
    };

    const interval = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
    };
  }, [id, setSongs, setIsLocked, setPlaylistName]);
};
