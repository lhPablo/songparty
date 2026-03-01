"use client";

import { PlaylistHeader } from "./title/PlaylistHeader";
import { SongList } from "../shared/SongList";
import { ListPlaceholder } from "../shared/ListPlaceholder";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsMounted } from "@/hooks/shared/useIsMounted";
import { Playlist } from "@/lib/types/domain/playlist";
import { QRViewer } from "@/components/qr/QRViewer";
import { HeadphoneOff } from "lucide-react";

interface MainPlaylistViewProps {
  playlist: Playlist;
  playlistId: string;
}

export const MainPlaylistView = ({
  playlist,
  playlistId,
}: MainPlaylistViewProps) => {
  const isMounted = useIsMounted();
  const selectedSongs = usePlaylistStore((state) => state.selectedSongs);
  const isLocked = usePlaylistStore((state) => state.isLocked);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const isOwner = !!ownerToken;
  const hasSongs = selectedSongs.length > 0;

  if (!isMounted) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
      <div className="lg:col-span-7 flex flex-col gap-8">
        <PlaylistHeader
          createdAt={playlist.createdAt}
          expiresAt={playlist.expiresAt}
          playlistId={playlistId}
        />

        <div className="bg-panel/40 p-3 md:p-6 lg:p-8 rounded-2xl border border-border-dark shadow-glass">
          {hasSongs ? (
            <SongList songs={selectedSongs} isSortable={!isLocked || isOwner} />
          ) : (
            <ListPlaceholder
              message="Esta lista no tiene canciones todavía."
              icon={HeadphoneOff}
            />
          )}
        </div>
      </div>

      <div id="qr-section" className="lg:col-span-5">
        <div className="sticky top-24 flex justify-center">
          <QRViewer />
        </div>
      </div>
    </div>
  );
};
