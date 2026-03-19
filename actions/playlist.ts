"use server";

import { Song } from "@/lib/types/domain/song";
import { redis } from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";

import { Playlist } from "@/lib/types/domain/playlist";
import {
  PLAYLIST_EXPIRATION_SECONDS,
  PLAYLIST_EXPIRATION_MS,
  INITIAL_PLAYLIST_STATE,
} from "@/lib/constants/playlist";

export async function savePlaylist(
  songs: Song[] = INITIAL_PLAYLIST_STATE.songs,
  title: string = INITIAL_PLAYLIST_STATE.title,
  isLocked: boolean = INITIAL_PLAYLIST_STATE.isLocked,
) {
  const playlistId = uuidv4();
  const ownerToken = uuidv4();

  const now = new Date();
  const playlistData: Playlist = {
    title,
    songs,
    isLocked,
    ownerToken,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + PLAYLIST_EXPIRATION_MS).toISOString(),
  };

  await redis.set(`playlist:${playlistId}`, JSON.stringify(playlistData), {
    ex: PLAYLIST_EXPIRATION_SECONDS,
  });

  return { playlistId, ownerToken };
}

export async function updatePlaylist(
  id: string,
  songs: Song[],
  title: string,
  isLocked: boolean = false,
  ownerToken?: string,
) {
  const existingData = await redis.get(`playlist:${id}`);

  if (!existingData) {
    throw new Error("Playlist no encontrada");
  }

  // Upstash Redis automatically parses JSON if it can.
  // If it's already an object, we don't need to parse it.
  const existingPlaylist = (
    typeof existingData === "string" ? JSON.parse(existingData) : existingData
  ) as Playlist;

  // if you try to change the lock status or the name, you need the ownerToken
  const isChangingPrivacyOrTitle =
    isLocked !== existingPlaylist.isLocked || title !== existingPlaylist.title;

  if (isChangingPrivacyOrTitle && ownerToken !== existingPlaylist.ownerToken) {
    throw new Error(
      "No tienes permiso para realizar esta acción administrativa",
    );
  }

  // if the playlist is locked, no one (except the owner) can add songs.
  if (existingPlaylist.isLocked && ownerToken !== existingPlaylist.ownerToken) {
    throw new Error(
      "Esta playlist está bloqueada y solo el dueño puede modificarla",
    );
  }

  const now = new Date();
  const updatedPlaylist: Playlist = {
    ...existingPlaylist,
    songs,
    title,
    isLocked,
    updatedAt: now.toISOString(),
  };

  await redis.set(`playlist:${id}`, JSON.stringify(updatedPlaylist), {
    keepTtl: true,
  });

  return id;
}

export async function getPlaylist(id: string) {
  const data = await redis.get(`playlist:${id}`);

  if (!data) {
    return null;
  }

  return (typeof data === "string" ? JSON.parse(data) : data) as Playlist;
}
