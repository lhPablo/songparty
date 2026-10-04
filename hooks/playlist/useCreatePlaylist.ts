"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { savePlaylist } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import {
  INITIAL_PLAYLIST_STATE,
  URL_TOKEN_PARAM,
} from "@/lib/constants/playlist";

export const useCreatePlaylist = () => {
  const [isCreating, setIsCreating] = useState(false);
  const clearPlaylist = usePlaylistStore((state) => state.clearPlaylist);
  const setSavedPlaylistId = usePlaylistStore(
    (state) => state.setSavedPlaylistId,
  );
  const router = useRouter();
  const t = useTranslations("errors");

  const createPlaylist = async () => {
    setIsCreating(true);
    try {
      // To create a playlist for the first time, it is always open to be able to add songs
      const { playlistId, ownerToken } = await savePlaylist(
        INITIAL_PLAYLIST_STATE.songs,
        INITIAL_PLAYLIST_STATE.title,
        INITIAL_PLAYLIST_STATE.isLocked,
      );

      // Drop the previous playlist's persisted state
      clearPlaylist();
      setSavedPlaylistId(playlistId);

      // Build the URL with the token for admin permissions
      const adminPath = `/playlist/${playlistId}?${URL_TOKEN_PARAM}=${ownerToken}`;
      router.push(adminPath);
    } catch {
      sileo.error({ title: t("createPlaylist") });
      setIsCreating(false);
    }
  };

  return {
    createPlaylist,
    isCreating,
  };
};
