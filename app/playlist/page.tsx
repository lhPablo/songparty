"use client";

import { usePlaylistStore } from "@/lib/store/usePlaylistStore";
import { SongItem } from "@/components/songs/SongItem";
import { ListPlaceholder } from "@/components/songs/ListPlaceholder";

export default function PlaylistPage() {
  const selectedSongs = usePlaylistStore((state) => state.selectedSongs);
  const clearPlaylist = usePlaylistStore((state) => state.clearPlaylist);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {selectedSongs.length > 0 && (
              <button
                onClick={clearPlaylist}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-medium border border-red-500/20"
              >
                <span className="material-symbols-outlined text-xl">
                  delete_sweep
                </span>
                Vaciar lista
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {selectedSongs.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {selectedSongs.map((song) => (
                  <li
                    key={song.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-white dark:hover:bg-primary/10 transition-all group border border-transparent hover:border-primary/30"
                  >
                    <SongItem song={song} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center gap-6 py-20">
                <ListPlaceholder
                  message="Tu lista está vacía. ¡Añade algunas canciones para empezar la fiesta!"
                  icon="playlist_add"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
