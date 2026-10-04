import Ably from "ably";
import { StoredPlaylist } from "@/lib/types/domain/playlist";
import { toPublicPlaylist } from "@/lib/utils/publicPlaylist";
import {
  PLAYLIST_UPDATED_EVENT,
  getPlaylistChannelName,
} from "@/lib/constants/playlist";

let restClient: Ably.Rest | null = null;

export function getAblyRest(): Ably.Rest {
  const key = process.env.ABLY_API_KEY;
  if (!key) throw new Error("Missing ABLY_API_KEY");

  restClient ??= new Ably.Rest({ key });
  return restClient;
}

export async function publishPlaylistUpdate(
  id: string,
  playlist: StoredPlaylist,
): Promise<void> {
  const rest = getAblyRest();

  // The change already reached Redis and clients resync on reconnect, so a
  // transient publish error must not report the mutation as failed
  try {
    await rest.channels
      .get(getPlaylistChannelName(id))
      .publish(PLAYLIST_UPDATED_EVENT, toPublicPlaylist(playlist));
  } catch (error) {
    console.error("Error publishing playlist update:", error);
  }
}
