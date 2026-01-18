import { NextResponse } from "next/server";
import { searchSongs } from "@/lib/services/domain/songService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title = searchParams.get("title")?.trim() || "";
  const author = searchParams.get("author")?.trim() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  let query = "";
  if (title) query += title;
  if (author) query += ` ${author}`;
  query = query.trim();

  const allSongs = await searchSongs(query);

  const start = (page - 1) * limit;
  const end = start + limit;
  const data = allSongs.slice(start, end);

  return NextResponse.json({
    data,
    nextPage: end < allSongs.length ? page + 1 : null,
    hasMore: end < allSongs.length,
  });
}
