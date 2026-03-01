"use client";

import { useEffect, useRef } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { getPlaylist } from "@/actions/playlist";

const POLL_INTERVAL_ACTIVE_MS = 30000;
const POLL_INTERVAL_PASSIVE_MS = 60000;
const INACTIVITY_THRESHOLD_MS = 3 * 60 * 1000; // 3 minutes
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
  const storeIsLocked = usePlaylistStore((state) => state.isLocked);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
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
      } catch (error) {
        console.error("Error during playlist polling:", error);
      }
    };

    const isOwner = !!ownerToken;
    const pollInterval =
      isOwner || !storeIsLocked
        ? POLL_INTERVAL_ACTIVE_MS
        : POLL_INTERVAL_PASSIVE_MS;

    const interval = setInterval(poll, pollInterval);

    return () => {
      clearInterval(interval);
      ACTIVITY_EVENTS.forEach((event) =>
        window.removeEventListener(event, handleActivity),
      );
    };
  }, [id, setSongs, setIsLocked, setPlaylistName, storeIsLocked, ownerToken]);
};
