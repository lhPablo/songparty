import { Song } from "@/lib/types/domain/song";
import { searchGeniusSongs } from "../external/geniusService";

export const searchSongs = async (
  query: string,
  page: number = 1,
): Promise<Song[]> => {
  return searchGeniusSongs(query, page);
};
