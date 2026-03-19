"use client";

import { PlaylistHeader } from "./title/PlaylistHeader";
import { AddSongsLink } from "./AddSongsLink";
import { SongList } from "../shared/SongList";
import { ListPlaceholder } from "../shared/ListPlaceholder";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsMounted } from "@/hooks/shared/useIsMounted";
import { Playlist } from "@/lib/types/domain/playlist";
import { QRViewer } from "@/components/qr/QRViewer";
import { useTranslations } from "next-intl";
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
  const canAdd = !isLocked || isOwner;
  const t = useTranslations("playlist");

  if (!isMounted) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
      <div className="lg:col-span-12">
        <PlaylistHeader
          createdAt={playlist.createdAt}
          expiresAt={playlist.expiresAt}
        />
      </div>

      <div className="lg:col-span-7 bg-panel/40 p-3 md:p-6 lg:p-8 rounded-2xl border border-border-dark shadow-glass flex flex-col gap-3 justify-between">
        {hasSongs ? (
          <div className="overflow-y-auto max-h-[75vh] pr-1 pt-4 pb-4 custom-scrollbar scroll-fade">
            <SongList songs={selectedSongs} isSortable={canAdd} />
          </div>
        ) : (
          <ListPlaceholder message={t("emptyState")} icon={HeadphoneOff} />
        )}
        {canAdd && (
          <div className="mt-auto">
            <AddSongsLink playlistId={playlistId} />
          </div>
        )}
      </div>

      <div id="qr-section" className="lg:col-span-5">
        <div className="sticky top-24 flex justify-center">
          <QRViewer />
        </div>
      </div>
    </div>
  );
};
