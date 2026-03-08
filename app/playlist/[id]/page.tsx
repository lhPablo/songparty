import { Suspense, cache } from "react";
import { getPlaylist } from "@/actions/playlist";
import { SyncSharedPlaylist } from "@/components/songs/playlist/SyncSharedPlaylist";
import { MainPlaylistView } from "@/components/songs/playlist/MainPlaylistView";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Playlist } from "@/lib/types/domain/playlist";
import { getTranslations } from "next-intl/server";

const getCachedPlaylist = cache(getPlaylist);

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations("errors");

  try {
    const { id } = await params;
    const playlist = await getCachedPlaylist(id);

    const title = playlist ? `${playlist.title}` : t("playlistNotFound");
    const description = playlist
      ? `Únete a la playlist "${playlist.title}" en SongParty. Añade tus canciones favoritas y disfruta de la fiesta en tiempo real.`
      : t("playlistDescription");

    return {
      title,
      description,
      openGraph: {
        title: `Playlist: ${title}`,
        description,
        type: "website",
        images: ["/og-image.png"],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
      },
      robots: {
        index: false,
        follow: true,
      },
    };
  } catch {
    return {
      title: "SongParty",
      description: t("playlistDescription"),
    };
  }
}

export default async function SharedPlaylistPage({ params }: Props) {
  const { id } = await params;
  const playlist = await getCachedPlaylist(id);

  if (!playlist) {
    notFound();
  }

  // The token should only be stored in client state via SyncSharedPlaylist using the URL parameter,
  // preventing it from being exposed in the initial HTML or propagated through component props.
  const publicPlaylist: Playlist = {
    ...playlist,
    ownerToken: null,
  };

  return (
    <main className="flex flex-1 justify-center">
      <Suspense fallback={null}>
        <SyncSharedPlaylist
          id={id}
          songs={playlist.songs}
          isLocked={playlist.isLocked}
          title={playlist.title}
        />
      </Suspense>
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <MainPlaylistView playlist={publicPlaylist} playlistId={id} />
        </section>
      </div>
    </main>
  );
}
