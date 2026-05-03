import { mapGeniusSongsToSongs } from "@/lib/mappers/songMapper";
import { GeniusSong } from "@/lib/types/external/geniusSong";

const createMockGeniusSong = (
  overrides: Partial<GeniusSong> = {},
): GeniusSong => ({
  id: 123,
  title: "Bohemian Rhapsody",
  primary_artist: { name: "Queen" },
  release_date_for_display: "Oct 31, 1975",
  song_art_image_thumbnail_url: "https://example.com/cover.jpg",
  url: "https://genius.com/Queen-bohemian-rhapsody-lyrics",
  lyrics_state: "complete",
  ...overrides,
});

describe("songMapper", () => {
  it("should correctly map GeniusSong to internal Song format", () => {
    const mockGeniusSong = createMockGeniusSong();

    const result = mapGeniusSongsToSongs([mockGeniusSong]);

    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 123,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      date: "Oct 31, 1975",
      coverUrl: "https://example.com/cover.jpg",
      lyricsUrl: "https://genius.com/Queen-bohemian-rhapsody-lyrics",
    });
  });

  it("should handle missing release date with empty string", () => {
    const mockGeniusSong = createMockGeniusSong({
      release_date_for_display: null,
    });

    const result = mapGeniusSongsToSongs([mockGeniusSong]);

    expect(result[0].date).toBe("");
  });
});
