import { create } from "zustand";
import { persist } from "zustand/middleware";
import { INITIAL_PLAYLIST_STATE } from "@/lib/constants/playlist";
import { createSongsSlice, SongsSlice } from "./slices/songsSlice";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";
import { createUiSlice, UiSlice } from "./slices/uiSlice";

export type PlaylistState = SongsSlice &
  AuthSlice &
  UiSlice & {
    clearPlaylist: () => void;
  };

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (...storeApi) => ({
      ...createSongsSlice(...storeApi),
      ...createAuthSlice(...storeApi),
      ...createUiSlice(...storeApi),

      clearPlaylist: () =>
        storeApi[0]({
          selectedSongs: [],
          playlistName: INITIAL_PLAYLIST_STATE.title,
          isLocked: false,
          isSaving: false,
          savedPlaylistId: null,
          isShowQr: false,
          ownerToken: null,
        }),
    }),
    {
      name: "songparty-storage-v2",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              !["isShowQr", "isSaving", "isLocked", "ownerToken"].includes(key),
          ),
        ),
    },
  ),
);
