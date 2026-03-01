"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsMounted } from "@/hooks/shared/useIsMounted";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { CirclePlus, QrCode } from "lucide-react";

interface PlaylistToolsProps {
  playlistId: string;
}

export const PlaylistTools = ({ playlistId }: PlaylistToolsProps) => {
  const isMounted = useIsMounted();
  const isLocked = usePlaylistStore((state) => state.isLocked);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const isOwner = !!ownerToken;

  if (!isMounted) return null;

  const handleScrollToQr = () => {
    document
      .getElementById("qr-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {(!isLocked || isOwner) && (
        <Link
          href={`/playlist/${playlistId}/search${isOwner && ownerToken ? `?${URL_TOKEN_PARAM}=${ownerToken}` : ""}`}
        >
          <Button icon={CirclePlus} className="rounded-xl">
            Añadir Canciones
          </Button>
        </Link>
      )}

      <Button
        variant="secondary"
        icon={QrCode}
        className="rounded-xl lg:hidden"
        onClick={handleScrollToQr}
      >
        Ver QR
      </Button>
    </div>
  );
};
