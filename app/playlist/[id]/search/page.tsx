import { getPlaylist } from "@/actions/playlist";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SongSearchForm } from "@/components/songs/search/SongSearchForm";
import { SongListData } from "@/components/songs/search/SongListData";
import { SyncSharedPlaylist } from "@/components/songs/playlist/SyncSharedPlaylist";
import { SearchAccessDenied } from "@/components/songs/search/SearchAccessDenied";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export default async function PlaylistSearchPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { token } = await searchParams;
  const playlist = await getPlaylist(id);

  if (!playlist) {
    notFound();
  }

  const isOwner = !!token && token === playlist.ownerToken;

  // If the playlist is locked, do not allow search (except for the owner)
  if (playlist.isLocked && !isOwner) {
    return <SearchAccessDenied playlistId={id} token={token} />;
  }

  return (
    <main className="flex flex-1 justify-center">
      <SyncSharedPlaylist
        id={id}
        songs={playlist.songs}
        isLocked={playlist.isLocked}
        title={playlist.title}
      />
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <div className="mb-6">
            <Link
              href={`/playlist/${id}${token ? `?${URL_TOKEN_PARAM}=${token}` : ""}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowLeft className="size-5" />
              Volver a {playlist.title}
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] md:text-[48px] font-black leading-tight">
                Buscador de canciones
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                Añade canciones a{" "}
                <span className="font-bold text-primary">{playlist.title}</span>
              </p>
            </div>

            <SongSearchForm />
            <SongListData />
          </div>
        </section>
      </div>
    </main>
  );
}
