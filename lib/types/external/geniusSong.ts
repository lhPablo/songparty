export interface GeniusSong {
  id: number;
  title: string;
  primary_artist: {
    name: string;
  };
  song_art_image_thumbnail_url: string;
  release_date_for_display: string;
}
