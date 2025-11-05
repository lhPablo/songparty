import { Song } from "@/lib/types/Song";

export const SongItem = ({ song }: { song: Song }) => {
  return (
    <li>
      <h2>{song.title}</h2>
      <p>{song.artist}</p>
    </li>
  );
};
