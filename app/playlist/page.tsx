"use client";

import { usePlaylistActions } from "@/lib/hooks/usePlaylistActions";
import { SongList } from "@/components/songs/shared/SongList";
import { ListPlaceholder } from "@/components/songs/shared/ListPlaceholder";
import { PlaylistTitle } from "@/components/songs/playlist/PlaylistTitle";
import { PlaylistActionsBar } from "@/components/songs/playlist/PlaylistActionsBar";
import { PlaylistShareCard } from "@/components/songs/playlist/PlaylistShareCard";

export default function PlaylistPage() {
  const { selectedSongs, isShowQr } = usePlaylistActions();

  return (
    <main className="flex min-h-screen justify-center relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto">
        <section
          className={`w-full transition-all duration-500 py-8 px-4 ${
            !isShowQr
              ? "opacity-100 scale-100 pointer-events-auto animate-zoom-in"
              : "opacity-0 scale-50 pointer-events-none animate-zoom-out absolute invisible"
          }`}
          aria-hidden={isShowQr}
        >
          {selectedSongs.length > 0 ? (
            <>
              <PlaylistActionsBar />
              <div className="flex flex-col gap-4">
                <PlaylistTitle />
                <SongList songs={selectedSongs} isSortable />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-6 py-20">
              <ListPlaceholder
                message="Tu lista está vacía. ¡Añade algunas canciones para empezar la fiesta!"
                icon="playlist_add"
              />
            </div>
          )}
        </section>
        <section
          className={`w-full max-w-md transition-all duration-500 flex justify-center items-center h-[calc(100vh-10rem)] ${
            isShowQr
              ? "opacity-100 scale-100 pointer-events-auto animate-zoom-in"
              : "opacity-0 scale-50 pointer-events-none animate-zoom-out absolute invisible"
          }`}
          aria-hidden={!isShowQr}
        >
          <PlaylistShareCard />
        </section>
      </div>
    </main>
  );
}
