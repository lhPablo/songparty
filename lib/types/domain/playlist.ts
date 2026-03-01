import { Song } from "./song";

export interface Playlist {
  title: string;
  songs: Song[];
  isLocked: boolean;
  ownerToken: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}
