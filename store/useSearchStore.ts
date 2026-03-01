import { create } from "zustand";

let loadingTimer: NodeJS.Timeout | null = null;

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

  // Actions
  setSongQuery: (query: string) => void;
  setAuthorQuery: (query: string) => void;
  applyFilters: (songQuery?: string, authorQuery?: string) => void;
  resetFilters: () => void;

  // High-level UI sync
  syncLoadingState: (isLoading: boolean, songCount: number) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  songQuery: "",
  authorQuery: "",
  appliedSongQuery: "",
  appliedAuthorQuery: "",
  hasSearched: false,
  showEmptyMessage: false,
  showLoading: false,

  setSongQuery: (query) => set({ songQuery: query }),
  setAuthorQuery: (query) => set({ authorQuery: query }),

  applyFilters: (songQuery?: string, authorQuery?: string) =>
    set((state) => ({
      appliedSongQuery: songQuery !== undefined ? songQuery : state.songQuery,
      appliedAuthorQuery:
        authorQuery !== undefined ? authorQuery : state.authorQuery,
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
    if (isLoading) {
      if (loadingTimer) clearTimeout(loadingTimer);
      loadingTimer = null;
      set({ showLoading: true });
    } else if (!loadingTimer) {
      loadingTimer = setTimeout(() => {
        loadingTimer = null;
        if (songCount > 0) {
          set({ showLoading: false });
        } else {
          set({ showLoading: false, showEmptyMessage: true });
        }
      }, 500);
    }
  },
}));
