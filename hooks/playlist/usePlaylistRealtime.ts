"use client";

import { useEffect } from "react";
import Ably from "ably";
import { getPlaylist } from "@/actions/playlist";
import { Playlist } from "@/lib/types/domain/playlist";
import {
  PLAYLIST_UPDATED_EVENT,
  getPlaylistChannelName,
} from "@/lib/constants/playlist";
import { useApplyPlaylistSnapshot } from "./useApplyPlaylistSnapshot";

const HIDDEN_DISCONNECT_MS = 5 * 60 * 1000;

export const usePlaylistRealtime = (id: string) => {
  const applySnapshot = useApplyPlaylistSnapshot();

  useEffect(() => {
    let hiddenTimeout: ReturnType<typeof setTimeout> | null = null;
    // Closing on cleanup rejects the pending attach ("Connection closed"),
    // On Strict Mode remounts: that is expected, not worth logging
    let isDisposed = false;

    const resync = async () => {
      try {
        const playlist = await getPlaylist(id);
        if (playlist) applySnapshot(playlist);
      } catch (error) {
        console.error("Error resyncing playlist:", error);
      }
    };

    const realtime = new Ably.Realtime({
      authUrl: "/api/ably/token",
      authParams: { playlistId: id },
    });
    const channel = realtime.channels.get(getPlaylistChannelName(id));

    channel
      .subscribe(PLAYLIST_UPDATED_EVENT, (message) =>
        applySnapshot(message.data as Playlist),
      )
      .catch((error) => {
        if (!isDisposed) {
          console.error("Error subscribing to playlist updates:", error);
        }
      });

    realtime.connection.on((change) => {
      if (change.current === "connected") resync();
    });

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        hiddenTimeout = setTimeout(
          () => realtime.connection.close(),
          HIDDEN_DISCONNECT_MS,
        );
        return;
      }

      if (hiddenTimeout) clearTimeout(hiddenTimeout);
      hiddenTimeout = null;
      // Reconnecting triggers a resync through the "connected" listener
      if (realtime.connection.state === "closed") realtime.connect();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isDisposed = true;
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (hiddenTimeout) clearTimeout(hiddenTimeout);
      channel.unsubscribe();
      realtime.close();
    };
  }, [id, applySnapshot]);
};
