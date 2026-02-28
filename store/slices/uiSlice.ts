import { StateCreator } from "zustand";
import { PlaylistState } from "../usePlaylistStore";

export interface UiSlice {
  isShowQr: boolean;
  setIsShowQr: (show: boolean) => void;
  isSaving: boolean;
  setIsSaving: (isSaving: boolean) => void;
}

export const createUiSlice: StateCreator<
  PlaylistState,
  [["zustand/persist", unknown]],
  [],
  UiSlice
> = (set) => ({
  isShowQr: false,
  isSaving: false,

  setIsShowQr: (show) => set({ isShowQr: show }),
  setIsSaving: (isSaving) => set({ isSaving }),
});
