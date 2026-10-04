import { Song } from "./song";
import { SongSignup } from "./songSignup";
import { Participant, StoredParticipant } from "./participant";

export interface Playlist {
  title: string;
  songs: Song[];
  isLocked: boolean;
  ownerToken: string | null;
  currentSongId: number | null;
  signups: Record<number, SongSignup[]>;
  participants: Participant[];
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

// Shape persisted in Redis: unlike the public Playlist, it keeps the owner
// token and the participants' secrets. Never send it to the client.
export type StoredPlaylist = Omit<Playlist, "participants"> & {
  participants?: StoredParticipant[];
};
