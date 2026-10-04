import { act, renderHook } from "@testing-library/react";
import { useApplyPlaylistSnapshot } from "@/hooks/playlist/useApplyPlaylistSnapshot";
import type { Playlist } from "@/lib/types/domain/playlist";

const { state } = vi.hoisted(() => ({
  state: {
    setSongs: vi.fn(),
    setIsLocked: vi.fn(),
    setPlaylistName: vi.fn(),
    setCurrentSongId: vi.fn(),
    setSignups: vi.fn(),
  },
}));

vi.mock("@/store/usePlaylistStore", () => ({
  usePlaylistStore: (selector: (s: typeof state) => unknown) => selector(state),
}));

const snapshot = (title: string, updatedAt: string): Playlist => ({
  title,
  songs: [],
  isLocked: false,
  ownerToken: null,
  currentSongId: null,
  signups: {},
  participants: [],
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt,
  expiresAt: "2026-02-01T00:00:00.000Z",
});

describe("useApplyPlaylistSnapshot", () => {
  it("ignores snapshots older than the last applied one", () => {
    const { result } = renderHook(() => useApplyPlaylistSnapshot());

    act(() => result.current(snapshot("New", "2026-01-01T10:00:01.000Z")));
    act(() => result.current(snapshot("Old", "2026-01-01T10:00:00.000Z")));

    expect(state.setPlaylistName).toHaveBeenCalledTimes(1);
    expect(state.setPlaylistName).toHaveBeenCalledWith("New");
  });
});
