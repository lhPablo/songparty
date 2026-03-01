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

  try {
    const rawSongs = await searchSongs(query, page);

    // Local filter to refine Genius's broad search results
    const filteredSongs = title
      ? rawSongs.filter((song) =>
          song.title.toLowerCase().includes(title.toLowerCase()),
        )
      : rawSongs.filter((song) =>
          song.artist.toLowerCase().includes(author.toLowerCase()),
        );

    const hasMore = rawSongs.length >= 20;

    return NextResponse.json({
      data: filteredSongs,
      nextPage: hasMore ? page + 1 : null,
      hasMore,
    });
  } catch (error) {
    console.error("Error searching songs:", error);
    return NextResponse.json(
      { error: "Error al buscar canciones" },
      { status: 500 },
    );
  }
}
