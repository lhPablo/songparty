"use server";

import { Song } from "../types/domain/song";
import { redis } from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";

export async function savePlaylist(
  songs: Song[],
  title: string,
  isLocked: boolean = false,
) {
  if (!songs || songs.length === 0) {
    throw new Error("No hay canciones en la lista");
  }

  const playlistId = uuidv4();

  const playlistData = {
    title,
    songs,
    isLocked,
    createdAt: new Date().toISOString(),
  };

  // Save to Redis with an expiration of 3 days
  await redis.set(`playlist:${playlistId}`, JSON.stringify(playlistData), {
    ex: 60 * 60 * 24 * 3,
  });

  return playlistId;
}
