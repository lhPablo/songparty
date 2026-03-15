import { Song } from "@/lib/types/domain/song";
import { GeniusSearchResponse } from "../../types/external/geniusSearchResponse";
import { mapGeniusSongsToSongs } from "../../mappers/songMapper";

const GENIUS_API_URL = "https://api.genius.com";

export const searchGeniusSongs = async (
  query: string,
  page: number = 1,
): Promise<Song[]> => {
  if (!query) return [];

  const token = process.env.GENIUS_ACCESS_TOKEN;
  if (!token) {
    throw new Error("GENIUS_ACCESS_TOKEN is not defined");
  }

  const url = new URL(`${GENIUS_API_URL}/search`);
  url.searchParams.append("q", query);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("per_page", "20");
  console.log(
    `[Genius API] Executing search request: ${url.toString()} with query: "${query}"`,
  );

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  let response;
  try {
    response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 3600, // Cache results for 1 hour
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    console.log(`[Genius API] Fetch completed with status: ${response.status}`);
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`[Genius API] Fetch failed or timed out:`, error);
    throw error;
  }

  if (!response.ok) {
    throw new Error(`Genius API error: ${response.statusText}`);
  }

  const data: GeniusSearchResponse = await response.json();
  console.log(`[Genius API] Response hits count: ${data.response.hits.length}`);
  data.response.hits.forEach((hit, index) => {
    console.log(
      `  [Hit ${index}] Type: ${hit.type}, Title: "${hit.result.title}", Artist: "${hit.result.primary_artist.name}", Lyrics State: ${hit.result.lyrics_state}`,
    );
  });

  return mapGeniusSongsToSongs(
    data.response.hits
      .filter(
        (hit) => hit.type === "song" && hit.result.lyrics_state === "complete",
      )
      .map((hit) => hit.result),
  );
};
