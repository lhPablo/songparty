import { ParticipantIdentity } from "@/lib/types/domain/participant";

const STORAGE_KEY = "songparty-playlist-identities";
const LEGACY_STORAGE_KEY = "songparty-guest-identity";

// One identity per playlist: a guest can be a different person in each list
type StoredIdentities = Record<string, ParticipantIdentity>;

function readIdentities(): StoredIdentities {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredIdentities) : {};
  } catch {
    return {};
  }
}

function writeIdentities(identities: StoredIdentities): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(identities));
    window.localStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — safe to ignore
  }
}

export function getStoredIdentity(
  playlistId: string,
): ParticipantIdentity | null {
  return readIdentities()[playlistId] ?? null;
}

export function saveIdentity(
  playlistId: string,
  identity: ParticipantIdentity,
): void {
  writeIdentities({ ...readIdentities(), [playlistId]: identity });
}

export function removeStoredIdentity(playlistId: string): void {
  const { [playlistId]: _removed, ...rest } = readIdentities();
  writeIdentities(rest);
}
