import { create } from "zustand";

interface SearchState {
  // Input values (temporary)
  songQuery: string;
  authorQuery: string;

  // Values used for the actual search
  appliedSongQuery: string;
  appliedAuthorQuery: string;

  // UI States
  hasSearched: boolean;
  showEmptyMessage: boolean;
  showLoading: boolean;

  // Internal timer references
  _emptyMessageTimer: NodeJS.Timeout | null;
  _loadingTimer: NodeJS.Timeout | null;

  // Actions
  setSongQuery: (query: string) => void;
  setAuthorQuery: (query: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;

  // High-level UI sync
  syncLoadingState: (isLoading: boolean, songCount: number) => void;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  songQuery: "",
  authorQuery: "",
  appliedSongQuery: "",
  appliedAuthorQuery: "",
  hasSearched: false,
  showEmptyMessage: false,
  showLoading: false,
  _emptyMessageTimer: null,
  _loadingTimer: null,

  setSongQuery: (query) => set({ songQuery: query }),
  setAuthorQuery: (query) => set({ authorQuery: query }),

  applyFilters: () =>
    set((state) => ({
      appliedSongQuery: state.songQuery,
      appliedAuthorQuery: state.authorQuery,
      hasSearched: true,
      showEmptyMessage: false,
      showLoading: true,
    })),

  resetFilters: () =>
    set({
      songQuery: "",
      authorQuery: "",
      appliedSongQuery: "",
      appliedAuthorQuery: "",
      hasSearched: false,
      showEmptyMessage: false,
      showLoading: false,
    }),

  syncLoadingState: (isLoading, songCount) => {
    const state = get();

    // 1. Handle Loading Flashing
    if (isLoading) {
      if (state._loadingTimer) clearTimeout(state._loadingTimer);
      set({ showLoading: true, _loadingTimer: null });
    } else if (!state._loadingTimer) {
      const timer = setTimeout(() => {
        if (songCount > 0) {
          set({ showLoading: false, _loadingTimer: null });
        } else {
          set({
            showLoading: false,
            showEmptyMessage: true,
            _loadingTimer: null,
          });
        }
      }, 500);
      set({ _loadingTimer: timer });
    }
  },
}));
