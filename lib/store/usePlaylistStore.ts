import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Song } from "@/lib/types/domain/song";

interface PlaylistState {
  selectedSongs: Song[];
  playlistName: string;
  addSong: (song: Song) => void;
  removeSong: (songId: number) => void;
  setPlaylistName: (name: string) => void;
  clearPlaylist: () => void;
  isSongSelected: (songId: number) => boolean;
}

export const usePlaylistStore = create<PlaylistState>()(
  persist(
    (set, get) => ({
      selectedSongs: [],
      playlistName: "Mi lista",

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

      clearPlaylist: () => set({ selectedSongs: [], playlistName: "Mi lista" }),

      isSongSelected: (songId) => {
        return get().selectedSongs.some((s) => s.id === songId);
      },
    }),
    {
      name: "playlist-storage",
    },
  ),
);
