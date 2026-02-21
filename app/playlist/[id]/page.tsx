import { getPlaylist } from "@/actions/playlist";
import { SyncSharedPlaylist } from "@/components/songs/playlist/SyncSharedPlaylist";
import { MainPlaylistView } from "@/components/songs/playlist/MainPlaylistView";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Playlist } from "@/lib/types/domain/playlist";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const playlist = await getPlaylist(id);

  return {
    title: playlist
      ? `${playlist.title} - Song Party`
      : "Playlist no encontrada",
    description: "Lista colaborativa de karaoke para tu evento",
  };
}

export default async function SharedPlaylistPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { token } = await searchParams;
  const playlist = await getPlaylist(id);

  if (!playlist) {
    notFound();
  }

  // The token should only be stored in client state via SyncSharedPlaylist using the URL parameter,
  // preventing it from being exposed in the initial HTML or propagated through component props.
  const publicPlaylist: Playlist = {
    ...playlist,
    ownerToken: undefined,
  };

  return (
    <main className="flex min-h-screen justify-center">
      <SyncSharedPlaylist
        id={id}
        songs={playlist.songs}
        isLocked={playlist.isLocked}
        title={playlist.title}
        ownerToken={token}
      />
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <MainPlaylistView playlist={publicPlaylist} playlistId={id} />
        </section>
      </div>
    </main>
  );
}
