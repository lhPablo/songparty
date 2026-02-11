"use client";

import { usePlaylistActions } from "@/lib/hooks/usePlaylistActions";
import { SongList } from "@/components/songs/shared/SongList";
import { ListPlaceholder } from "@/components/songs/shared/ListPlaceholder";
import { PlaylistTitle } from "@/components/songs/playlist/PlaylistTitle";
import { PlaylistActionsBar } from "@/components/songs/playlist/PlaylistActionsBar";

export default function PlaylistPage() {
  const {
    selectedSongs,
    playlistName,
    isSaving,
    playlistId,
    clearPlaylist,
    handleGenerateQR,
  } = usePlaylistActions();

  const hasSongs = selectedSongs.length > 0;

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          {hasSongs && (
            <PlaylistActionsBar
              onClear={clearPlaylist}
              onGenerateQR={handleGenerateQR}
              isSaving={isSaving}
              playlistId={playlistId}
              playlistName={playlistName}
            />
          )}

          <div className="flex flex-col gap-4">
            <PlaylistTitle />

            {hasSongs ? (
              <SongList songs={selectedSongs} />
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
