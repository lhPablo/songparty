export const PLAYLIST_EXPIRATION_DAYS = 15;
export const PLAYLIST_EXPIRATION_SECONDS =
  60 * 60 * 24 * PLAYLIST_EXPIRATION_DAYS;
export const PLAYLIST_EXPIRATION_MS = PLAYLIST_EXPIRATION_SECONDS * 1000;

export const URL_TOKEN_PARAM = "token";

export const INITIAL_PLAYLIST_STATE = {
  songs: [],
  title: "Mi Lista",
  isLocked: false,
  currentSongId: null,
  signups: {},
};

export const PLAYLIST_UPDATED_EVENT = "playlist.updated";
export const getPlaylistChannelName = (id: string) => `playlist:${id}`;

export const MAX_PARTICIPANT_NAME_LENGTH = 24;
