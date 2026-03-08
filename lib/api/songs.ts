import { PaginatedSongsResponse } from "@/lib/types/domain/paginatedSongResponse";

interface QueryProps {
  pageParam: number;
  title: string;
  author: string;
}

export const fetchSongs = async (
  query: QueryProps,
): Promise<PaginatedSongsResponse> => {
  const url = new URL("/api/songs", window.location.origin);
  url.searchParams.append("page", query.pageParam.toString());
  if (query.title) url.searchParams.append("title", query.title);
  if (query.author) url.searchParams.append("author", query.author);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error("Error fetching songs");
  }

  return response.json();
};
