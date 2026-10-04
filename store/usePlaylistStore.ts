import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSongsSlice, SongsSlice } from "./slices/songsSlice";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";
import { createUiSlice, UiSlice } from "./slices/uiSlice";
import { createSignupsSlice, SignupsSlice } from "./slices/signupsSlice";
import { createIdentitySlice, IdentitySlice } from "./slices/identitySlice";

export type PlaylistState = SongsSlice &
  AuthSlice &
  UiSlice &
  SignupsSlice &
  IdentitySlice & {
    clearPlaylist: () => void;
  };

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get, store) => ({
      ...createSongsSlice(set, get, store),
      ...createAuthSlice(set, get, store),
      ...createUiSlice(set, get, store),
      ...createSignupsSlice(set, get, store),
      ...createIdentitySlice(set, get, store),

      clearPlaylist: () => {
        const state = get();
        state.clearSongs();
        state.clearAuth();
        state.clearUi();
        state.clearSignups();
        state.clearIdentity();
      },
    }),
    {
      name: "songparty-storage",
      version: 1,
      migrate: () => ({}) as PlaylistState,
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) =>
              ![
                "isSaving",
                "isLocked",
                "ownerToken",
                "currentSongId",
                "signups",
                "identity",
                "isIdentityResolved",
              ].includes(key),
          ),
        ),
    },
  ),
);
