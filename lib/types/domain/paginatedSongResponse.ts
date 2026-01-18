import { Song } from "./song"; // tu modelo de canción

export interface PaginatedSongsResponse {
  data: Song[];
  nextPage: number | null;
  hasMore: boolean;
}
