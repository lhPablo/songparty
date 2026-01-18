import { PaginatedSongsResponse } from "@/lib/types/domain/paginatedSongResponse";

interface QueryProps {
  pageParam: number;
  title: string;
  author: string;
}

export const fetchSongs = async (
  query: QueryProps,
): Promise<PaginatedSongsResponse> => {
  let url = `/api/songs?page=${query.pageParam}&limit=10`;

  if (query.title && query.title !== "") url += `&title=${query.title}`;
  if (query.author && query.author !== "") url += `&author=${query.author}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al cargar canciones");
  return res.json();
};
