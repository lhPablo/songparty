import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "@/lib/types/domain/song";

interface PlaylistState {
  selectedSongs: Song[];
  playlistName: string;
  isLocked: boolean;
  isSaving: boolean;
  savedPlaylistId: string | null;
  addSong: (song: Song) => void;
  removeSong: (songId: number) => void;
  setPlaylistName: (name: string) => void;
  setIsLocked: (isLocked: boolean) => void;
  setIsSaving: (isSaving: boolean) => void;
  setSavedPlaylistId: (id: string | null) => void;
  reorderSongs: (startIndex: number, endIndex: number) => void;
  clearPlaylist: () => void;
  isSongSelected: (songId: number) => boolean;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      selectedSongs: [],
      playlistName: "Mi lista",
      isLocked: false,
      isSaving: false,
      savedPlaylistId: null,

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

      setPlaylistName: (name) => set({ playlistName: name }),

      setIsLocked: (isLocked) => set({ isLocked }),

      setIsSaving: (isSaving) => set({ isSaving }),

      setSavedPlaylistId: (id) => set({ savedPlaylistId: id }),

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
          playlistName: "Mi lista",
          isLocked: false,
          isSaving: false,
          savedPlaylistId: null,
        }),

      isSongSelected: (songId) => {
        return get().selectedSongs.some((s) => s.id === songId);
      },
    }),
    {
      name: "playlist-storage",
    },
  ),
);
