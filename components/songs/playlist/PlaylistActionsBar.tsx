"use client";

import { Button } from "@/components/ui/Button";
import { StatusToggle } from "@/components/ui/StatusToggle";
import { usePlaylistActions } from "@/hooks/playlist/usePlaylistActions";
import { Lock, Trash2, QrCode, UserPlus } from "lucide-react";

export const PlaylistActionsBar = () => {
  const { clearPlaylist, handleGenerateQR, isSaving, isLocked, setIsLocked } =
    usePlaylistActions();

  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col items-end md:flex-row md:justify-end gap-4 w-full">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <StatusToggle
            checked={isLocked}
            onChange={() => setIsLocked(!isLocked)}
            falseOption={{
              label: "Colaborativa",
              icon: UserPlus,
              activeBg: "bg-green-500",
              activeShadow: "shadow-green-500/20",
              inactiveText: "text-green-700 dark:text-green-400",
            }}
            trueOption={{
              label: "Solo lectura",
              icon: Lock,
              activeBg: "bg-amber-500",
              activeShadow: "shadow-amber-500/20",
              inactiveText: "text-amber-700 dark:text-amber-400",
            }}
          />

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden md:block" />

          <Button variant="destructive" icon={Trash2} onClick={clearPlaylist}>
            Vaciar
          </Button>

          <Button icon={QrCode} loading={isSaving} onClick={handleGenerateQR}>
            Generar QR
          </Button>
        </div>
      </div>
    </div>
  );
};
