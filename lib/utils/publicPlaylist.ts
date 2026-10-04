import { Playlist, StoredPlaylist } from "@/lib/types/domain/playlist";

// Strips the owner token and participant secrets before anything leaves the server
export function toPublicPlaylist(playlist: StoredPlaylist): Playlist {
  return {
    ...playlist,
    ownerToken: null,
    participants: (playlist.participants ?? []).map(
      ({ id, name, joinedAt }) => ({ id, name, joinedAt }),
    ),
  };
}
