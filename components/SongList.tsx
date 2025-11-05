import { Song } from "@/lib/types/Song";
import { SongItem } from "./SongItem";

interface SongListProps {
  songs: Song[];
}

export const SongList = ({ songs }: SongListProps) => {
  return (
    <ul>
      {songs && songs.map((song) => <SongItem key={song.id} song={song} />)}
    </ul>
  );
};
