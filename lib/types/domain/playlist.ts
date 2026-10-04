import { Song } from "./song";
import { SongSignup } from "./songSignup";
import { Participant } from "./participant";

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
