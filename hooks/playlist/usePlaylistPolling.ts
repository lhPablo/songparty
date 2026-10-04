"use client";

import { useEffect, useRef } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { getPlaylist } from "@/actions/playlist";

const POLL_INTERVAL_MS = 30000;
const INACTIVITY_THRESHOLD_MS = 1 * 60 * 1000; // 1 minutes
const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = [
  "keydown",
  "click",
  "touchstart",
  "scroll",
];

export const usePlaylistPolling = (id: string) => {
  const setSongs = usePlaylistStore((state) => state.setSongs);
  const setIsLocked = usePlaylistStore((state) => state.setIsLocked);
  const setPlaylistName = usePlaylistStore((state) => state.setPlaylistName);
  const setCurrentSongId = usePlaylistStore((state) => state.setCurrentSongId);
  const setSignups = usePlaylistStore((state) => state.setSignups);
  const lastActivityRef = useRef(Date.now());

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
        setCurrentSongId(playlist.currentSongId);
        setSignups(playlist.signups ?? {});
      } catch (error) {
        console.error("Error during playlist polling:", error);
      }
    };

    // Keep polling regardless of lock/owner status: even on a locked
    // playlist, non-owners still need to see the current song and the
    // sign-up queues update in real time.
    const interval = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
    };
  }, [
    id,
    setSongs,
    setIsLocked,
    setPlaylistName,
    setCurrentSongId,
    setSignups,
  ]);
};
