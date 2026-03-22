import { Suspense } from "react";
import { getPlaylist } from "@/actions/playlist";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SongSearchForm } from "@/components/songs/search/SongSearchForm";
import { SongListData } from "@/components/songs/search/SongListData";
import { SyncSharedPlaylist } from "@/components/songs/playlist/SyncSharedPlaylist";
import { SearchAccessDenied } from "@/components/songs/search/SearchAccessDenied";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ token?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const playlist = await getPlaylist(id);
  const t = await getTranslations("search");

  const title = playlist ? `${t("title")} - ${playlist.title}` : t("title");

  return {
    title,
    description: `Busca y añade canciones a la playlist "${playlist?.title || "SongParty"}".`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function PlaylistSearchPage({
  params,
  searchParams,
}: Props) {
  const { id } = await params;
  const { token } = await searchParams;
  const playlist = await getPlaylist(id);
  const t = await getTranslations("search");

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
      <Suspense fallback={null}>
        <SyncSharedPlaylist
          id={id}
          songs={playlist.songs}
          isLocked={playlist.isLocked}
          title={playlist.title}
        />
      </Suspense>
      <div className="flex-1 flex flex-col w-full">
        <section className="layout-content-container flex flex-col w-full max-w-7xl mx-auto flex-1 py-8 px-4 min-w-0 overflow-x-hidden md:overflow-visible">
          <div className="mb-6">
            <Link
              href={`/playlist/${id}${token ? `?${URL_TOKEN_PARAM}=${token}` : ""}`}
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium max-w-full"
            >
              <ArrowLeft className="size-5 flex-shrink-0" />
              <span className="truncate">
                {t("backTo", { title: playlist.title })}
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-6 overflow-hidden w-full">
            <div className="space-y-2">
              <h1 className="text-text-primary dark:text-white tracking-tight text-[32px] md:text-[48px] font-black leading-tight">
                {t("title")}
              </h1>
              <p className="text-gray-500 dark:text-gray-400">
                {t("addSongsTo")}{" "}
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
