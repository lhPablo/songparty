import { fetchSongs } from "@/lib/api/songs";
import type { PaginatedSongsResponse } from "@/lib/types/domain/paginatedSongResponse";

const emptyResponse: PaginatedSongsResponse = {
  data: [],
  nextPage: null,
  hasMore: false,
};

const stubFetch = (body: unknown, ok = true) => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      json: async () => body,
    }),
  );
};

describe("fetchSongs", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("includes page param in the request URL", async () => {
    stubFetch(emptyResponse);
    await fetchSongs({ pageParam: 3, title: "", author: "" });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("page=3");
  });

  it("includes title param when provided", async () => {
    stubFetch(emptyResponse);
    await fetchSongs({ pageParam: 1, title: "bohemian", author: "" });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("title=bohemian");
  });

  it("includes author param when provided", async () => {
    stubFetch(emptyResponse);
    await fetchSongs({ pageParam: 1, title: "", author: "queen" });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("author=queen");
  });

  it("omits title param when empty", async () => {
    stubFetch(emptyResponse);
    await fetchSongs({ pageParam: 1, title: "", author: "queen" });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).not.toContain("title=");
  });

  it("omits author param when empty", async () => {
    stubFetch(emptyResponse);
    await fetchSongs({ pageParam: 1, title: "bohemian", author: "" });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).not.toContain("author=");
  });

  it("includes both title and author when both are provided", async () => {
    stubFetch(emptyResponse);
    await fetchSongs({ pageParam: 1, title: "rhapsody", author: "queen" });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("title=rhapsody");
    expect(url).toContain("author=queen");
  });

  it("throws when response is not ok", async () => {
    stubFetch(null, false);
    await expect(
      fetchSongs({ pageParam: 1, title: "", author: "" }),
    ).rejects.toThrow("Error fetching songs");
  });

  it("returns the parsed JSON response", async () => {
    const mockResponse: PaginatedSongsResponse = {
      data: [
        {
          id: 1,
          title: "Bohemian Rhapsody",
          artist: "Queen",
          date: "1975",
          coverUrl: "https://example.com/cover.jpg",
          lyricsUrl: "https://genius.com/song",
        },
      ],
      nextPage: 2,
      hasMore: true,
    };
    stubFetch(mockResponse);
    const result = await fetchSongs({ pageParam: 1, title: "", author: "" });
    expect(result).toEqual(mockResponse);
  });

  it("targets /api/songs endpoint", async () => {
    stubFetch(emptyResponse);
    await fetchSongs({ pageParam: 1, title: "", author: "" });
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("/api/songs");
  });
});
