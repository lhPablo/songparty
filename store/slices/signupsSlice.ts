import { StateCreator } from "zustand";
import { SongSignup } from "@/lib/types/domain/songSignup";
import { PlaylistState } from "../usePlaylistStore";

export interface SignupsSlice {
  signups: Record<number, SongSignup[]>;
  setSignups: (signups: Record<number, SongSignup[]>) => void;
  clearSignups: () => void;
}

export const createSignupsSlice: StateCreator<
  PlaylistState,
  [["zustand/persist", unknown]],
  [],
  SignupsSlice
> = (set) => ({
  signups: {},

  setSignups: (signups) => set({ signups }),

  clearSignups: () => set({ signups: {} }),
});
