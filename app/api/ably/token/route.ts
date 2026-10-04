import { NextResponse } from "next/server";
import { validate as isUuid } from "uuid";
import { redis } from "@/lib/redis";
import { getAblyRest } from "@/lib/ably";
import { getPlaylistChannelName } from "@/lib/constants/playlist";

// Browsers never see the API key: they get a short-lived token that can only
// subscribe to the channel of the playlist they are viewing
export async function GET(request: Request) {
  const playlistId = new URL(request.url).searchParams.get("playlistId") ?? "";
  if (!isUuid(playlistId) || !(await redis.exists(`playlist:${playlistId}`))) {
    return NextResponse.json(
      { error: "Playlist no encontrada" },
      { status: 404 },
    );
  }

  try {
    const tokenRequest = await getAblyRest().auth.createTokenRequest({
      capability: { [getPlaylistChannelName(playlistId)]: ["subscribe"] },
    });
    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error("Error creating Ably token request:", error);
    return NextResponse.json(
      { error: "Error al conectar con el tiempo real" },
      { status: 500 },
    );
  }
}
