"use client";

import { useCallback, useState } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { joinPlaylist } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { saveIdentity } from "@/lib/utils/playlistIdentityStorage";

type JoinError = "nameTaken" | "invalidName" | null;

export const useJoinPlaylist = (playlistId: string) => {
  const setIdentity = usePlaylistStore((state) => state.setIdentity);
  const t = useTranslations("errors");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<JoinError>(null);

  const handleJoin = useCallback(
    async (name: string) => {
      if (!name.trim()) {
        setError("invalidName");
        return;
      }

      setIsJoining(true);
      setError(null);

      try {
        const result = await joinPlaylist(playlistId, name);
        if (!result.ok) {
          setError(result.error);
          return;
        }

        saveIdentity(playlistId, result.identity);
        setIdentity(result.identity);
      } catch {
        sileo.error({ title: t("joinPlaylist") });
      } finally {
        setIsJoining(false);
      }
    },
    [playlistId, setIdentity, t],
  );

  return { handleJoin, isJoining, error };
};
