"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusToggle } from "@/components/ui/StatusToggle";
import { usePlaylistActions } from "@/hooks/playlist/usePlaylistActions";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";

interface PlaylistToolsProps {
  playlistId: string;
}

export const PlaylistTools = ({ playlistId }: PlaylistToolsProps) => {
  const {
    isLocked,
    setIsLocked,
    isShowQr,
    setIsShowQr,
    isMounted,
    isOwner,
    ownerToken,
  } = usePlaylistActions();

  if (!isMounted) return null;

  return (
    <div className="flex flex-col gap-4 w-full">
      <div
        className={`flex flex-wrap gap-3 transition-all duration-500 ease-in-out ${
          isShowQr
            ? "opacity-0 scale-95 h-0 overflow-hidden pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        {(!isLocked || isOwner) && (
          <Link
            href={`/playlist/${playlistId}/search${isOwner && ownerToken ? `?${URL_TOKEN_PARAM}=${ownerToken}` : ""}`}
          >
            <Button icon="add_circle" className="rounded-xl">
              Añadir Canciones
            </Button>
          </Link>
        )}

        <Button
          variant="secondary"
          icon="qr_code_2"
          className="rounded-xl"
          onClick={() => setIsShowQr(true)}
        >
          Mostrar QR
        </Button>

        {isOwner && (
          <StatusToggle
            checked={isLocked}
            onChange={() => setIsLocked(!isLocked)}
            falseOption={{
              label: "Colaborativa",
              icon: "groups",
              activeBg: "bg-green-500",
              activeShadow: "shadow-green-500/20",
              inactiveText: "text-green-600",
            }}
            trueOption={{
              label: "Solo Lectura",
              icon: "lock",
              activeBg: "bg-amber-500",
              activeShadow: "shadow-amber-500/20",
              inactiveText: "text-amber-600",
            }}
          />
        )}
      </div>
    </div>
  );
};
