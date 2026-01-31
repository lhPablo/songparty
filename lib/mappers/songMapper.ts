import { GeniusSong } from "@/lib/types/external/geniusSong";
import { Song } from "@/lib/types/domain/song";

export const mapGeniusSongsToSongs = (songs: GeniusSong[]): Song[] => {
  return songs.map((song) => mapGeniusSongToSong(song));
};

const mapGeniusSongToSong = (song: GeniusSong): Song => {
  return {
    id: song.id,
    title: song.title,
    artist: song.primary_artist.name,
    date: song.release_date_for_display,
    coverUrl: song.song_art_image_thumbnail_url,
  };
};
