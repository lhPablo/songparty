import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "@/lib/types/domain/song";

interface PlaylistState {
  selectedSongs: Song[];
  playlistName: string;
  isLocked: boolean;
  addSong: (song: Song) => void;
  removeSong: (songId: number) => void;
  setPlaylistName: (name: string) => void;
  setIsLocked: (isLocked: boolean) => void;
  clearPlaylist: () => void;
  isSongSelected: (songId: number) => boolean;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      selectedSongs: [],
      playlistName: "Mi lista",
      isLocked: false,

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

      clearPlaylist: () =>
        set({ selectedSongs: [], playlistName: "Mi lista", isLocked: false }),

      isSongSelected: (songId) => {
        return get().selectedSongs.some((s) => s.id === songId);
      },
    }),
    {
      name: "playlist-storage",
    },
  ),
);
