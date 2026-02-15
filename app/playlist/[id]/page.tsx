import { getPlaylist } from "@/lib/actions/playlist";
import { SongList } from "@/components/songs/shared/SongList";
import { ListPlaceholder } from "@/components/songs/shared/ListPlaceholder";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const playlist = await getPlaylist(id);

  return {
    title: playlist
      ? `${playlist.title} - Song Party`
      : "Playlist no encontrada",
    description: "Únete a esta fiesta y añade tus canciones favoritas.",
  };
}

export default async function SharedPlaylistPage({ params }: Props) {
  const { id } = await params;
  const playlist = await getPlaylist(id);

  if (!playlist) {
    notFound();
  }

  const hasSongs = playlist.songs && playlist.songs.length > 0;

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <div className="flex flex-col gap-8">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  Playlist Compartida
                </span>
                {playlist.isLocked && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">
                      lock
                    </span>
                    Solo lectura
                  </span>
                )}
              </div>
              <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] md:text-[48px] font-black leading-tight">
                {playlist.title}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Creada el {new Date(playlist.createdAt).toLocaleDateString()}
              </p>
            </div>

            {hasSongs ? (
              <SongList
                songs={playlist.songs}
                isSortable={!playlist.isLocked}
              />
            ) : (
              <div className="flex flex-col items-center gap-6 py-20">
                <ListPlaceholder
                  message="Esta lista no tiene canciones todavía."
                  icon="music_off"
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
