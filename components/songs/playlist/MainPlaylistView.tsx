"use client";

import { PlaylistHeader } from "./PlaylistHeader";
import { PlaylistShareCard } from "./PlaylistShareCard";
import { SongList } from "../shared/SongList";
import { ListPlaceholder } from "../shared/ListPlaceholder";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsMounted } from "@/hooks/shared/useIsMounted";
import { Playlist } from "@/lib/types/domain/playlist";

interface MainPlaylistViewProps {
  playlist: Playlist;
  playlistId: string;
}

export const MainPlaylistView = ({
  playlist,
  playlistId,
}: MainPlaylistViewProps) => {
  const isMounted = useIsMounted();
  const isShowQr = usePlaylistStore((state) => state.isShowQr);
  const hasSongs = playlist.songs && playlist.songs.length > 0;

  if (!isMounted) return null;

  return (
    <div
      className={`flex flex-col w-full max-w-4xl mx-auto transition-all duration-500 ${isShowQr ? "gap-0 min-h-[60vh] justify-center" : "gap-8"}`}
    >
      <div
        className={`transition-all duration-500 ease-in-out ${
          isShowQr
            ? "animate-zoom-out h-0 overflow-hidden opacity-0 pointer-events-none"
            : "animate-zoom-in block"
        }`}
      >
        <PlaylistHeader
          isLocked={playlist.isLocked}
          createdAt={playlist.createdAt}
          playlistId={playlistId}
        />
      </div>

      {isShowQr ? (
        <div className="animate-zoom-in w-full flex justify-center py-4">
          <PlaylistShareCard />
        </div>
      ) : (
        <div className="animate-zoom-in w-full">
          {hasSongs ? (
            <SongList songs={playlist.songs} isSortable={!playlist.isLocked} />
          ) : (
            <div className="flex flex-col items-center gap-6 py-20">
              <ListPlaceholder
                message="Esta lista no tiene canciones todavía."
                icon="music_off"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
