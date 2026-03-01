import { StateCreator } from "zustand";
import { PlaylistState } from "../usePlaylistStore";

export interface UiSlice {
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
  clearUi: () => void;
}

export const createUiSlice: StateCreator<
  PlaylistState,
  [["zustand/persist", unknown]],
  [],
  UiSlice
> = (set) => ({
  isSaving: false,

  setIsSaving: (isSaving) => set({ isSaving }),

  clearUi: () => set({ isSaving: false }),
});
