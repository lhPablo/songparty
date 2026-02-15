import { Song } from "./song";

export interface PaginatedSongsResponse {
  data: Song[];
  nextPage: number | null;
  hasMore: boolean;
  total: number;
}
