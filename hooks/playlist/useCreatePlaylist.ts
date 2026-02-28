"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";
import { savePlaylist } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import {
  INITIAL_PLAYLIST_STATE,
  URL_TOKEN_PARAM,
} from "@/lib/constants/playlist";

export const useCreatePlaylist = () => {
  const [isCreating, setIsCreating] = useState(false);
  const setSavedPlaylistId = usePlaylistStore(
    (state) => state.setSavedPlaylistId,
  );
  const router = useRouter();

  const createPlaylist = async () => {
    setIsCreating(true);
    try {
      // To create a playlist for the first time, it is always open to be able to add songs
      const { playlistId, ownerToken } = await savePlaylist(
        INITIAL_PLAYLIST_STATE.songs,
        INITIAL_PLAYLIST_STATE.title,
        INITIAL_PLAYLIST_STATE.isLocked,
      );

      setSavedPlaylistId(playlistId);

      // Build the URL with the token for admin permissions
      const adminPath = `/playlist/${playlistId}?${URL_TOKEN_PARAM}=${ownerToken}`;
      router.push(adminPath);
    } catch {
      sileo.error({ title: "Error al crear la playlist" });
      setIsCreating(false);
    }
  };

  return {
    createPlaylist,
    isCreating,
  };
};
