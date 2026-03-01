import { create } from "zustand";
import { persist } from "zustand/middleware";
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
    (set, get, store) => ({
      ...createSongsSlice(set, get, store),
      ...createAuthSlice(set, get, store),
      ...createUiSlice(set, get, store),

      clearPlaylist: () => {
        const state = get();
        state.clearSongs();
        state.clearAuth();
        state.clearUi();
      },
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
