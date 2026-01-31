import { Song } from "@/lib/types/domain/song";
import axios from "axios";
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
    console.error("GENIUS_ACCESS_TOKEN is not defined");
    return [];
  }

  try {
    const response = await axios.get<GeniusSearchResponse>(
      `${GENIUS_API_URL}/search`,
      {
        params: {
          q: query,
          page: page,
          per_page: 20,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return mapGeniusSongsToSongs(
      response.data.response.hits
        .filter(
          (hit) =>
            hit.type === "song" && hit.result.lyrics_state === "complete",
        )
        .map((hit) => hit.result),
    );
  } catch (error) {
    console.error("Error searching songs on Genius:", error);
    return [];
  }
};
