import { PaginatedSongsResponse } from "@/lib/types/domain/paginatedSongResponse";
import axios from "axios";

interface QueryProps {
  pageParam: number;
  title: string;
  author: string;
}

export const fetchSongs = async (
  query: QueryProps,
): Promise<PaginatedSongsResponse> => {
  const { data } = await axios.get<PaginatedSongsResponse>("/api/songs", {
    params: {
      page: query.pageParam,
      title: query.title || undefined,
      author: query.author || undefined,
    },
  });
  return data;
};
