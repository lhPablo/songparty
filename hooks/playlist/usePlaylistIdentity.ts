"use client";

import { useEffect } from "react";
import { verifyParticipant } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import {
  getStoredIdentity,
  removeStoredIdentity,
} from "@/lib/utils/playlistIdentityStorage";

export const usePlaylistIdentity = (playlistId: string) => {
  const setIdentity = usePlaylistStore((state) => state.setIdentity);
  const clearIdentity = usePlaylistStore((state) => state.clearIdentity);

  useEffect(() => {
    let isCancelled = false;
    clearIdentity();

    const stored = getStoredIdentity(playlistId);
    if (!stored) {
      setIdentity(null);
      return;
    }

    verifyParticipant(playlistId, stored.participantId, stored.secret)
      .then((isValid) => {
        if (isCancelled) return;
        if (!isValid) removeStoredIdentity(playlistId);
        setIdentity(isValid ? stored : null);
      })
      .catch(() => {
        // Network failure: keep the stored identity, the server re-checks it on every action
        if (!isCancelled) setIdentity(stored);
      });

    return () => {
      isCancelled = true;
    };
  }, [playlistId, setIdentity, clearIdentity]);
};
