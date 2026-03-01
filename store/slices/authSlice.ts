import { StateCreator } from "zustand";
import { PlaylistState } from "../usePlaylistStore";

export interface AuthSlice {
  ownerToken: string | null;
  setOwnerToken: (token: string | null) => void;
  isLocked: boolean;
  setIsLocked: (isLocked: boolean) => void;
  clearAuth: () => void;
}

export const createAuthSlice: StateCreator<
  PlaylistState,
  [["zustand/persist", unknown]],
  [],
  AuthSlice
> = (set, get) => ({
  ownerToken: null,
  isLocked: false,

  setOwnerToken: (token) => {
    if (get().ownerToken === token) return;
    set({ ownerToken: token });
  },

  setIsLocked: (isLocked) => {
    if (get().isLocked === isLocked) return;
    set({ isLocked });
  },

  clearAuth: () => set({ ownerToken: null, isLocked: false }),
});
