import { NextResponse } from "next/server";
import { searchSongs } from "@/lib/services/domain/songService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title")?.trim() || "";
  const author = searchParams.get("author")?.trim() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  let query = "";
  if (title) query += title;
  if (author) query += ` ${author}`;
  query = query.trim();

  const rawSongs = await searchSongs(query, page);

  // Genius not filter only by title, so we need to filter by title
  const filteredSongs = rawSongs.filter((song) =>
    song.title.toLowerCase().includes(query.toLowerCase()),
  );

  const hasMore = rawSongs.length >= 20;

  return NextResponse.json({
    data: filteredSongs,
    nextPage: hasMore ? page + 1 : null,
    hasMore: hasMore,
    total: filteredSongs.length,
  });
}
