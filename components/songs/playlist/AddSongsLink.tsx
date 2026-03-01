"use client";

import Link from "next/link";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { CirclePlus } from "lucide-react";

interface AddSongsLinkProps {
  playlistId: string;
}

export const AddSongsLink = ({ playlistId }: AddSongsLinkProps) => {
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const isOwner = !!ownerToken;

  const href = `/playlist/${playlistId}/search${isOwner && ownerToken ? `?${URL_TOKEN_PARAM}=${ownerToken}` : ""}`;

  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 py-6 border-2 border-dashed border-white/10 rounded-xl hover:border-primary/40 hover:bg-white/5 transition-all group cursor-pointer"
    >
      <CirclePlus
        size={24}
        className="text-primary group-hover:scale-110 transition-transform"
      />
      <span className="text-white/60 group-hover:text-white/80 font-medium transition-colors">
        Añadir canciones
      </span>
    </Link>
  );
};
