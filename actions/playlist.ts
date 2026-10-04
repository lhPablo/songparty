"use server";

import { Song } from "@/lib/types/domain/song";
import { redis } from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";

import { Playlist, StoredPlaylist } from "@/lib/types/domain/playlist";
import { SongSignup } from "@/lib/types/domain/songSignup";
import {
  ParticipantIdentity,
  StoredParticipant,
} from "@/lib/types/domain/participant";
import {
  PLAYLIST_EXPIRATION_SECONDS,
  PLAYLIST_EXPIRATION_MS,
  INITIAL_PLAYLIST_STATE,
  MAX_PARTICIPANT_NAME_LENGTH,
} from "@/lib/constants/playlist";
import { toPublicPlaylist } from "@/lib/utils/publicPlaylist";
import { publishPlaylistUpdate } from "@/lib/ably";

export type JoinPlaylistResult =
  | { ok: true; identity: ParticipantIdentity }
  | { ok: false; error: "nameTaken" | "invalidName" };

export interface SignupCredentials {
  ownerToken?: string;
  participantId?: string;
  secret?: string;
}

async function getExistingPlaylist(id: string): Promise<StoredPlaylist> {
  const existingData = await redis.get(`playlist:${id}`);

  if (!existingData) {
    throw new Error("Playlist no encontrada");
  }

  return (
    typeof existingData === "string" ? JSON.parse(existingData) : existingData
  ) as StoredPlaylist;
}

async function persistPlaylist(
  id: string,
  playlist: StoredPlaylist,
): Promise<void> {
  await redis.set(`playlist:${id}`, JSON.stringify(playlist), {
    keepTtl: true,
  });
  await publishPlaylistUpdate(id, playlist);
}

function normalizeParticipantName(name: string): string {
  return name.trim().replace(/\s+/g, " ").slice(0, MAX_PARTICIPANT_NAME_LENGTH);
}

function findAuthorizedParticipant(
  playlist: StoredPlaylist,
  participantId?: string,
  secret?: string,
): StoredParticipant | null {
  if (!participantId || !secret) return null;

  return (
    playlist.participants?.find(
      (p) => p.id === participantId && p.secret === secret,
    ) ?? null
  );
}

export async function savePlaylist(
  songs: Song[] = INITIAL_PLAYLIST_STATE.songs,
  title: string = INITIAL_PLAYLIST_STATE.title,
  isLocked: boolean = INITIAL_PLAYLIST_STATE.isLocked,
) {
  const playlistId = uuidv4();
  const ownerToken = uuidv4();

  const now = new Date();
  const playlistData: StoredPlaylist = {
    title,
    songs,
    isLocked,
    ownerToken,
    currentSongId: null,
    signups: {},
    participants: [],
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
  ) as StoredPlaylist;

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
  const updatedPlaylist: StoredPlaylist = {
    ...existingPlaylist,
    songs,
    title,
    isLocked,
    updatedAt: now.toISOString(),
  };

  await persistPlaylist(id, updatedPlaylist);

  return id;
}

export async function getPlaylist(id: string): Promise<Playlist | null> {
  const data = await redis.get(`playlist:${id}`);

  if (!data) {
    return null;
  }

  return toPublicPlaylist(
    (typeof data === "string" ? JSON.parse(data) : data) as StoredPlaylist,
  );
}

export async function verifyOwnerToken(
  id: string,
  ownerToken: string,
): Promise<boolean> {
  try {
    const existingPlaylist = await getExistingPlaylist(id);
    return ownerToken === existingPlaylist.ownerToken;
  } catch {
    return false;
  }
}

export async function setCurrentSong(
  id: string,
  songId: number | null,
  ownerToken: string,
): Promise<void> {
  const existingPlaylist = await getExistingPlaylist(id);

  if (ownerToken !== existingPlaylist.ownerToken) {
    throw new Error(
      "No tienes permiso para realizar esta acción administrativa",
    );
  }

  if (songId !== null && !existingPlaylist.songs.some((s) => s.id === songId)) {
    throw new Error("Canción no encontrada en la playlist");
  }

  const updatedPlaylist: StoredPlaylist = {
    ...existingPlaylist,
    currentSongId: songId,
    updatedAt: new Date().toISOString(),
  };

  await persistPlaylist(id, updatedPlaylist);
}

export async function joinPlaylist(
  id: string,
  name: string,
): Promise<JoinPlaylistResult> {
  const existingPlaylist = await getExistingPlaylist(id);
  const participants = existingPlaylist.participants ?? [];

  const normalizedName = normalizeParticipantName(name);
  if (!normalizedName) {
    return { ok: false, error: "invalidName" };
  }

  // Names are unique per playlist so nobody can pass as someone else
  const isNameTaken = participants.some(
    (p) => p.name.toLocaleLowerCase() === normalizedName.toLocaleLowerCase(),
  );
  if (isNameTaken) {
    return { ok: false, error: "nameTaken" };
  }

  const participant: StoredParticipant = {
    id: uuidv4(),
    name: normalizedName,
    secret: uuidv4(),
    joinedAt: new Date().toISOString(),
  };

  const updatedPlaylist: StoredPlaylist = {
    ...existingPlaylist,
    participants: [...participants, participant],
    updatedAt: new Date().toISOString(),
  };

  await persistPlaylist(id, updatedPlaylist);

  return {
    ok: true,
    identity: {
      participantId: participant.id,
      name: participant.name,
      secret: participant.secret,
    },
  };
}

export async function verifyParticipant(
  id: string,
  participantId: string,
  secret: string,
): Promise<boolean> {
  try {
    const existingPlaylist = await getExistingPlaylist(id);
    return !!findAuthorizedParticipant(existingPlaylist, participantId, secret);
  } catch {
    return false;
  }
}

export async function addSongSignup(
  id: string,
  songId: number,
  participantId: string,
  secret: string,
): Promise<SongSignup> {
  const existingPlaylist = await getExistingPlaylist(id);

  if (!existingPlaylist.songs.some((s) => s.id === songId)) {
    throw new Error("Canción no encontrada en la playlist");
  }

  const participant = findAuthorizedParticipant(
    existingPlaylist,
    participantId,
    secret,
  );
  if (!participant) {
    throw new Error("No formas parte de esta playlist");
  }

  const existingSignups = existingPlaylist.signups?.[songId] ?? [];

  // A participant can only sign up once per song
  const alreadySignedUp = existingSignups.find(
    (s) => s.participantId === participant.id,
  );
  if (alreadySignedUp) {
    return alreadySignedUp;
  }

  const signup: SongSignup = {
    id: uuidv4(),
    participantId: participant.id,
    name: participant.name,
    signedUpAt: new Date().toISOString(),
  };

  const updatedPlaylist: StoredPlaylist = {
    ...existingPlaylist,
    signups: {
      ...existingPlaylist.signups,
      [songId]: [...existingSignups, signup],
    },
    updatedAt: new Date().toISOString(),
  };

  await persistPlaylist(id, updatedPlaylist);

  return signup;
}

export async function removeSongSignup(
  id: string,
  songId: number,
  signupId: string,
  credentials: SignupCredentials,
): Promise<void> {
  const existingPlaylist = await getExistingPlaylist(id);
  const existingSignups = existingPlaylist.signups?.[songId] ?? [];

  const signup = existingSignups.find((s) => s.id === signupId);
  if (!signup) {
    throw new Error("No se ha encontrado el apuntado");
  }

  // The owner can remove anyone; a participant only their own signups
  const isOwner =
    !!credentials.ownerToken &&
    credentials.ownerToken === existingPlaylist.ownerToken;
  const participant = findAuthorizedParticipant(
    existingPlaylist,
    credentials.participantId,
    credentials.secret,
  );
  const isOwnSignup = !!participant && signup.participantId === participant.id;

  if (!isOwner && !isOwnSignup) {
    throw new Error("No tienes permiso para quitar este apuntado");
  }

  const updatedPlaylist: StoredPlaylist = {
    ...existingPlaylist,
    signups: {
      ...existingPlaylist.signups,
      [songId]: existingSignups.filter((s) => s.id !== signupId),
    },
    updatedAt: new Date().toISOString(),
  };

  await persistPlaylist(id, updatedPlaylist);
}
