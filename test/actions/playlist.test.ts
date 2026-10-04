import {
  savePlaylist,
  getPlaylist,
  joinPlaylist,
  verifyParticipant,
  addSongSignup,
  removeSongSignup,
  setCurrentSong,
  updatePlaylist,
} from "@/actions/playlist";
import type { Song } from "@/lib/types/domain/song";

const store = new Map<string, unknown>();

vi.mock("@/lib/redis", () => ({
  redis: {
    get: vi.fn(async (key: string) => store.get(key) ?? null),
    set: vi.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
  },
}));

const { publish } = vi.hoisted(() => ({ publish: vi.fn() }));

vi.mock("ably", () => ({
  default: {
    Rest: class {
      channels = { get: vi.fn(() => ({ publish })) };
    },
  },
}));

beforeEach(() => {
  vi.stubEnv("ABLY_API_KEY", "test:key");
});

afterEach(() => {
  vi.unstubAllEnvs();
});

const song = { id: 1, title: "Song", artist: "Artist" } as Song;

const createPlaylistWithSong = async () => {
  const { playlistId, ownerToken } = await savePlaylist([song], "Party");
  return { playlistId, ownerToken };
};

const join = async (playlistId: string, name: string) => {
  const result = await joinPlaylist(playlistId, name);
  if (!result.ok) throw new Error(result.error);
  return result.identity;
};

describe("playlist participants", () => {
  beforeEach(() => {
    store.clear();
  });

  it("never exposes the owner token or participant secrets", async () => {
    const { playlistId } = await createPlaylistWithSong();
    await join(playlistId, "Ana");

    const playlist = await getPlaylist(playlistId);

    expect(playlist?.ownerToken).toBeNull();
    expect(playlist?.participants).toHaveLength(1);
    expect(playlist?.participants[0]).not.toHaveProperty("secret");
  });

  it("rejects a name already taken, ignoring case and spaces", async () => {
    const { playlistId } = await createPlaylistWithSong();
    await join(playlistId, "Ana");

    const result = await joinPlaylist(playlistId, "  ana ");

    expect(result).toEqual({ ok: false, error: "nameTaken" });
  });

  it("rejects an empty name", async () => {
    const { playlistId } = await createPlaylistWithSong();

    const result = await joinPlaylist(playlistId, "   ");

    expect(result).toEqual({ ok: false, error: "invalidName" });
  });

  it("allows the same name in different playlists", async () => {
    const first = await createPlaylistWithSong();
    const second = await createPlaylistWithSong();
    await join(first.playlistId, "Ana");

    const result = await joinPlaylist(second.playlistId, "Ana");

    expect(result.ok).toBe(true);
  });

  it("verifies only the right secret", async () => {
    const { playlistId } = await createPlaylistWithSong();
    const ana = await join(playlistId, "Ana");

    expect(
      await verifyParticipant(playlistId, ana.participantId, ana.secret),
    ).toBe(true);
    expect(
      await verifyParticipant(playlistId, ana.participantId, "wrong"),
    ).toBe(false);
  });
});

describe("song signups", () => {
  beforeEach(() => {
    store.clear();
  });

  it("signs up with the participant's name, once per song", async () => {
    const { playlistId } = await createPlaylistWithSong();
    const ana = await join(playlistId, "Ana");

    const first = await addSongSignup(
      playlistId,
      song.id,
      ana.participantId,
      ana.secret,
    );
    const second = await addSongSignup(
      playlistId,
      song.id,
      ana.participantId,
      ana.secret,
    );

    expect(first.name).toBe("Ana");
    expect(second.id).toBe(first.id);
    expect((await getPlaylist(playlistId))?.signups[song.id]).toHaveLength(1);
  });

  it("rejects a signup with a wrong secret", async () => {
    const { playlistId } = await createPlaylistWithSong();
    const ana = await join(playlistId, "Ana");

    await expect(
      addSongSignup(playlistId, song.id, ana.participantId, "wrong"),
    ).rejects.toThrow();
  });

  it("does not let a participant remove someone else's signup", async () => {
    const { playlistId } = await createPlaylistWithSong();
    const ana = await join(playlistId, "Ana");
    const luis = await join(playlistId, "Luis");
    const signup = await addSongSignup(
      playlistId,
      song.id,
      ana.participantId,
      ana.secret,
    );

    await expect(
      removeSongSignup(playlistId, song.id, signup.id, {
        participantId: luis.participantId,
        secret: luis.secret,
      }),
    ).rejects.toThrow();
    await expect(
      removeSongSignup(playlistId, song.id, signup.id, {}),
    ).rejects.toThrow();
  });

  it("lets a participant remove their own signup", async () => {
    const { playlistId } = await createPlaylistWithSong();
    const ana = await join(playlistId, "Ana");
    const signup = await addSongSignup(
      playlistId,
      song.id,
      ana.participantId,
      ana.secret,
    );

    await removeSongSignup(playlistId, song.id, signup.id, {
      participantId: ana.participantId,
      secret: ana.secret,
    });

    expect((await getPlaylist(playlistId))?.signups[song.id]).toHaveLength(0);
  });

  it("lets the owner remove any signup", async () => {
    const { playlistId, ownerToken } = await createPlaylistWithSong();
    const ana = await join(playlistId, "Ana");
    const signup = await addSongSignup(
      playlistId,
      song.id,
      ana.participantId,
      ana.secret,
    );

    await removeSongSignup(playlistId, song.id, signup.id, { ownerToken });

    expect((await getPlaylist(playlistId))?.signups[song.id]).toHaveLength(0);
  });
});

describe("realtime updates", () => {
  beforeEach(() => {
    store.clear();
    publish.mockReset();
  });

  it("publishes a public snapshot after every mutation", async () => {
    const { playlistId, ownerToken } = await createPlaylistWithSong();
    expect(publish).not.toHaveBeenCalled();

    const ana = await join(playlistId, "Ana");
    const signup = await addSongSignup(
      playlistId,
      song.id,
      ana.participantId,
      ana.secret,
    );
    await removeSongSignup(playlistId, song.id, signup.id, { ownerToken });
    await setCurrentSong(playlistId, song.id, ownerToken);
    await updatePlaylist(playlistId, [song], "Renamed", false, ownerToken);

    expect(publish).toHaveBeenCalledTimes(5);
    const [event, snapshot] = publish.mock.calls.at(-1)!;
    expect(event).toBe("playlist.updated");
    expect(snapshot.title).toBe("Renamed");
    expect(snapshot.currentSongId).toBe(song.id);
    expect(snapshot.ownerToken).toBeNull();
    expect(snapshot.participants[0]).not.toHaveProperty("secret");
  });

  it("does not fail the mutation when publishing fails", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    publish.mockRejectedValue(new Error("Ably down"));
    const { playlistId } = await createPlaylistWithSong();

    const result = await joinPlaylist(playlistId, "Ana");

    expect(result.ok).toBe(true);
    expect((await getPlaylist(playlistId))?.participants).toHaveLength(1);
  });
});
