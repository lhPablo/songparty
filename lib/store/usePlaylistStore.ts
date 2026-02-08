import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "@/lib/types/domain/song";

interface PlaylistState {
  selectedSongs: Song[];
  addSong: (song: Song) => void;
  removeSong: (songId: number) => void;
  clearPlaylist: () => void;
  isSongSelected: (songId: number) => boolean;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      selectedSongs: [],

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

      clearPlaylist: () => set({ selectedSongs: [] }),

      isSongSelected: (songId) => {
        return get().selectedSongs.some((s) => s.id === songId);
      },
    }),
    {
      name: "playlist-storage",
    },
  ),
);
