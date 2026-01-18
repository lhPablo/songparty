import { Song } from "./Song"; // tu modelo de canción

export interface PaginatedSongsResponse {
  data: Song[];
  nextPage: number | null;
  hasMore: boolean;
}