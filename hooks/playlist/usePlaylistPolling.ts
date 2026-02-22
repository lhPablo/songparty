"use client";

import { useEffect, useRef } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { Song } from "@/lib/types/domain/song";
import { getPlaylist } from "@/actions/playlist";

const POLL_INTERVAL_MS = 10000;
const INACTIVITY_THRESHOLD_MS = 3 * 60 * 1000; // 3 minutes
const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  "keydown",
  "click",
  "touchstart",
  "scroll",
];

interface UsePlaylistPollingProps {
  id: string;
  songs: Song[];
  isLocked: boolean;
  title: string;
}

export const usePlaylistPolling = ({
  id,
  songs,
  isLocked,
  title,
}: UsePlaylistPollingProps) => {
  const setSongs = usePlaylistStore((state) => state.setSongs);
  const setSavedPlaylistId = usePlaylistStore(
    (state) => state.setSavedPlaylistId,
  );
  const setIsLocked = usePlaylistStore((state) => state.setIsLocked);
  const setPlaylistName = usePlaylistStore((state) => state.setPlaylistName);
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

      try {
        const playlist = await getPlaylist(id);
        if (!playlist) return;

        setSongs(playlist.songs);
        setIsLocked(playlist.isLocked);
        setPlaylistName(playlist.title);
      } catch (error) {
        console.error("Error during playlist polling:", error);
      }
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
