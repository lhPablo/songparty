import { searchGeniusSongs } from "@/lib/services/external/geniusService";
import type { GeniusSong } from "@/lib/types/external/geniusSong";

const makeSong = (overrides: Partial<GeniusSong> = {}): GeniusSong => ({
  id: 1,
  title: "Bohemian Rhapsody",
  url: "https://genius.com/song",
  primary_artist: { name: "Queen" },
  song_art_image_thumbnail_url: "https://example.com/cover.jpg",
  release_date_for_display: "Oct 31, 1975",
  lyrics_state: "complete",
  ...overrides,
});

const stubFetch = (hits: Array<{ type: string; result: GeniusSong }>, ok = true) => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      statusText: ok ? "OK" : "Unauthorized",
      json: async () => ({ response: { hits } }),
    }),
  );
};

describe("searchGeniusSongs", () => {
  beforeEach(() => {
    process.env.GENIUS_ACCESS_TOKEN = "test-token";
  });

  afterEach(() => {
    delete process.env.GENIUS_ACCESS_TOKEN;
    vi.unstubAllGlobals();
  });

  it("returns empty array for empty query without calling fetch", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const result = await searchGeniusSongs("");
    expect(result).toEqual([]);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("throws when GENIUS_ACCESS_TOKEN is not set", async () => {
    delete process.env.GENIUS_ACCESS_TOKEN;
    await expect(searchGeniusSongs("queen")).rejects.toThrow(
      "GENIUS_ACCESS_TOKEN is not defined",
    );
  });

  it("builds URL with query, page and per_page params", async () => {
    stubFetch([]);
    await searchGeniusSongs("queen", 2);
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("q=queen");
    expect(url).toContain("page=2");
    expect(url).toContain("per_page=20");
  });

  it("uses page 1 by default", async () => {
    stubFetch([]);
    await searchGeniusSongs("queen");
    const url = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][0] as string;
    expect(url).toContain("page=1");
  });

  it("sends Authorization header with the token", async () => {
    stubFetch([]);
    await searchGeniusSongs("queen");
    const options = (fetch as ReturnType<typeof vi.fn>).mock.calls[0][1];
    expect(options.headers.Authorization).toBe("Bearer test-token");
  });

  it("throws when the API response is not ok", async () => {
    stubFetch([], false);
    await expect(searchGeniusSongs("queen")).rejects.toThrow(
      "Genius API error: Unauthorized",
    );
  });

  it("rethrows network errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    await expect(searchGeniusSongs("queen")).rejects.toThrow("Network error");
  });

  it("filters out non-song type hits", async () => {
    stubFetch([
      { type: "artist", result: makeSong({ id: 1 }) },
      { type: "song", result: makeSong({ id: 2 }) },
    ]);
    const result = await searchGeniusSongs("queen");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters out songs with non-complete lyrics_state", async () => {
    stubFetch([
      { type: "song", result: makeSong({ id: 1, lyrics_state: "incomplete" }) },
      { type: "song", result: makeSong({ id: 2, lyrics_state: "complete" }) },
    ]);
    const result = await searchGeniusSongs("queen");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("returns empty array when all hits are filtered out", async () => {
    stubFetch([
      { type: "artist", result: makeSong() },
      { type: "song", result: makeSong({ lyrics_state: "incomplete" }) },
    ]);
    expect(await searchGeniusSongs("queen")).toEqual([]);
  });

  it("maps results to domain Song format", async () => {
    stubFetch([{ type: "song", result: makeSong() }]);
    const result = await searchGeniusSongs("queen");
    expect(result[0]).toMatchObject({
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      date: "Oct 31, 1975",
      coverUrl: "https://example.com/cover.jpg",
      lyricsUrl: "https://genius.com/song",
    });
  });
});
