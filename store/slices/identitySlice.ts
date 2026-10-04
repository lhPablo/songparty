import { StateCreator } from "zustand";
import { ParticipantIdentity } from "@/lib/types/domain/participant";
import { PlaylistState } from "../usePlaylistStore";

export interface IdentitySlice {
  identity: ParticipantIdentity | null;
  isIdentityResolved: boolean;
  setIdentity: (identity: ParticipantIdentity | null) => void;
  clearIdentity: () => void;
}

export const createIdentitySlice: StateCreator<
  PlaylistState,
  [["zustand/persist", unknown]],
  [],
  IdentitySlice
> = (set) => ({
  identity: null,
  isIdentityResolved: false,

  setIdentity: (identity) => set({ identity, isIdentityResolved: true }),

  clearIdentity: () => set({ identity: null, isIdentityResolved: false }),
});
