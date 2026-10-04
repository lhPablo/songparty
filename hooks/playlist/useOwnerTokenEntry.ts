"use client";

import { useState, useCallback } from "react";
import { verifyOwnerToken } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";

function extractToken(rawInput: string): string {
  const trimmed = rawInput.trim();

  try {
    const url = new URL(trimmed);
    return url.searchParams.get(URL_TOKEN_PARAM) ?? trimmed;
  } catch {
    return trimmed;
  }
}

export const useOwnerTokenEntry = (playlistId: string) => {
  const setOwnerToken = usePlaylistStore((state) => state.setOwnerToken);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const handleSubmitToken = useCallback(
    async (rawInput: string) => {
      const token = extractToken(rawInput);
      if (!token) {
        setIsInvalid(true);
        return;
      }

      setIsVerifying(true);
      setIsInvalid(false);

      try {
        const isValid = await verifyOwnerToken(playlistId, token);
        if (isValid) {
          setOwnerToken(token);
        } else {
          setIsInvalid(true);
        }
      } catch {
        setIsInvalid(true);
      } finally {
        setIsVerifying(false);
      }
    },
    [playlistId, setOwnerToken],
  );

  return {
    isVerifying,
    isInvalid,
    handleSubmitToken,
  };
};
