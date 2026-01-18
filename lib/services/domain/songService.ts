import { Song } from "@/lib/types/domain/song";
import { searchGeniusSongs } from "../external/geniusService";

export const searchSongs = async (query: string): Promise<Song[]> => {
  return searchGeniusSongs(query);
};
