import { StateCreator } from "zustand";
import { Song } from "@/lib/types/domain/song";
import { INITIAL_PLAYLIST_STATE } from "@/lib/constants/playlist";
import { PlaylistState } from "../usePlaylistStore";

export interface SongsSlice {
  selectedSongs: Song[];
  playlistName: string;
  savedPlaylistId: string | null;
  addSong: (song: Song) => void;
  removeSong: (songId: number) => void;
  setSongs: (songs: Song[]) => void;
  reorderSongs: (startIndex: number, endIndex: number) => void;
  isSongSelected: (songId: number) => boolean;
  setPlaylistName: (name: string) => void;
  setSavedPlaylistId: (id: string | null) => void;
}

export const createSongsSlice: StateCreator<
  PlaylistState,
  [["zustand/persist", unknown]],
  [],
  SongsSlice
> = (set, get) => ({
  selectedSongs: [],
  playlistName: INITIAL_PLAYLIST_STATE.title,
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

  setPlaylistName: (name) => {
    if (get().playlistName === name) return;
    set({ playlistName: name });
  },

  setSavedPlaylistId: (id) =>
    set({
      savedPlaylistId: id,
    }),

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

  isSongSelected: (songId) => {
    return get().selectedSongs.some((s) => s.id === songId);
  },
});
