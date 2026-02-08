"use client";

import { useState } from "react";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";
import { SongItem } from "@/components/songs/SongItem";
import { ListPlaceholder } from "@/components/songs/ListPlaceholder";
import { savePlaylist } from "@/lib/actions/playlist";

export default function PlaylistPage() {
  const selectedSongs = usePlaylistStore((state) => state.selectedSongs);
  const clearPlaylist = usePlaylistStore((state) => state.clearPlaylist);

  const [isSaving, setIsSaving] = useState(false);
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const handleGenerateQR = async () => {
    try {
      setIsSaving(true);
      const id = await savePlaylist(selectedSongs);
      setPlaylistId(id);
    } catch (error) {
      console.error("Error al guardar la playlist:", error);
      alert("No se pudo guardar la playlist. Inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {selectedSongs.length > 0 && (
              <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={clearPlaylist}
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-medium border border-red-500/20"
                  >
                    <span className="material-symbols-outlined text-xl group-hover:animate-shake">
                      delete
                    </span>
                    Vaciar lista
                  </button>

                  <button
                    onClick={handleGenerateQR}
                    disabled={isSaving}
                    className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all font-medium border border-primary/20 disabled:opacity-50"
                  >
                    <span
                      className={`material-symbols-outlined text-xl ${isSaving ? "animate-spin" : "group-hover:animate-shake"}`}
                    >
                      {isSaving ? "sync" : "qr_code"}
                    </span>
                    {isSaving ? "Guardando..." : "Generar QR"}
                  </button>
                </div>

                {playlistId && (
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-green-500/10 text-green-600 border border-green-500/20 animate-in fade-in slide-in-from-right-4 duration-500">
                    <span className="material-symbols-outlined text-xl">
                      check_circle
                    </span>
                    <span className="text-sm font-medium">
                      Lista guardada ID:{" "}
                      <span className="font-bold underline">{playlistId}</span>
                    </span>
                  </div>
                )}
              </div>
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
