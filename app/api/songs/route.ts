import { mockSongs } from "@/lib/data/mockSongs";
import { Song } from "@/lib/types/Song";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title")?.toUpperCase() || "";
  const author = searchParams.get("author")?.toUpperCase() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const start = (page - 1) * limit;
  const end = start + limit;

  const filteredSongs = mockSongs.filter((song: Song) =>
    song.title.toUpperCase().includes(title) && song.artist.toUpperCase().includes(author)
  );

  const data = filteredSongs.slice(start, end);

  return NextResponse.json({
    data,
    nextPage: end < filteredSongs.length ? page + 1 : null,
    hasMore: end < filteredSongs.length,
  });
}

