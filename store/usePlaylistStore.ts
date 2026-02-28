import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "@/lib/types/domain/song";
import { INITIAL_PLAYLIST_STATE } from "@/lib/constants/playlist";

interface PlaylistState {
  selectedSongs: Song[];
  playlistName: string;
  isLocked: boolean;
  isSaving: boolean;
  savedPlaylistId: string | null;
  isShowQr: boolean;
  ownerToken: string | null;
  addSong: (song: Song) => void;
  removeSong: (songId: number) => void;
  setPlaylistName: (name: string) => void;
  setIsLocked: (isLocked: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setSavedPlaylistId: (id: string | null) => void;
  setIsShowQr: (show: boolean) => void;
  setOwnerToken: (token: string | null) => void;
  setSongs: (songs: Song[]) => void;
  reorderSongs: (startIndex: number, endIndex: number) => void;
  clearPlaylist: () => void;
  isSongSelected: (songId: number) => boolean;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      selectedSongs: [],
      playlistName: INITIAL_PLAYLIST_STATE.title,
      isLocked: false,
      isSaving: false,
      savedPlaylistId: null,
      isShowQr: false,
      ownerToken: null,

      addSong: (song) => {
        const { selectedSongs } = get();
        if (!selectedSongs.find((s) => s.id === song.id)) {
          set({ selectedSongs: [...selectedSongs, song] });
        }
      },

      removeSong: (songId) => {
        set((state) => ({
          selectedSongs: state.selectedSongs.filter((s) => s.id !== songId),
        }));
      },

      setPlaylistName: (name) => {
        if (get().playlistName === name) return;
        set({ playlistName: name });
      },

      setIsLocked: (isLocked) => {
        if (get().isLocked === isLocked) return;
        set({ isLocked });
      },

      setIsSaving: (isSaving) => set({ isSaving }),

      setSavedPlaylistId: (id) =>
        set({
          savedPlaylistId: id,
        }),

      setIsShowQr: (show) => set({ isShowQr: show }),

      setOwnerToken: (token) => {
        if (get().ownerToken === token) return;
        set({ ownerToken: token });
      },

      setSongs: (songs) => {
        const currentSongs = get().selectedSongs;
        if (
          currentSongs.length === songs.length &&
          JSON.stringify(currentSongs) === JSON.stringify(songs)
        ) {
          return;
        }
        set({ selectedSongs: songs });
      },

      reorderSongs: (startIndex, endIndex) => {
        set((state) => {
          const songs = [...state.selectedSongs];
          const [removed] = songs.splice(startIndex, 1);
          songs.splice(endIndex, 0, removed);
          return { selectedSongs: songs };
        });
      },

      clearPlaylist: () =>
        set({
          selectedSongs: [],
          playlistName: INITIAL_PLAYLIST_STATE.title,
          isLocked: false,
          isSaving: false,
          savedPlaylistId: null,
          isShowQr: false,
          ownerToken: null,
        }),

      isSongSelected: (songId) => {
        return get().selectedSongs.some((s) => s.id === songId);
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
