import { Button } from "@/components/ui/Button";
import { StatusToggle } from "@/components/ui/StatusToggle";

interface PlaylistActionsBarProps {
  onClear: () => void;
  onGenerateQR: () => void;
  isSaving: boolean;
  playlistId: string | null;
  playlistName: string;
  isLocked: boolean;
  onToggleLock: () => void;
}

export const PlaylistActionsBar = ({
  onClear,
  onGenerateQR,
  isSaving,
  playlistId,
  playlistName,
  isLocked,
  onToggleLock,
}: PlaylistActionsBarProps) => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col items-end md:flex-row md:justify-end gap-4 w-full">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <StatusToggle
            checked={isLocked}
            onChange={onToggleLock}
            falseOption={{
              label: "Colaborativa",
              icon: "group_add",
              activeBg: "bg-green-500",
              activeShadow: "shadow-green-500/20",
              inactiveText: "text-green-700 dark:text-green-400",
            }}
            trueOption={{
              label: "Solo lectura",
              icon: "lock",
              activeBg: "bg-amber-500",
              activeShadow: "shadow-amber-500/20",
              inactiveText: "text-amber-700 dark:text-amber-400",
            }}
          />

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden md:block" />

          <Button variant="danger" icon="delete" onClick={onClear}>
            Vaciar
          </Button>

          <Button
            variant="secondary"
            icon="qr_code"
            loading={isSaving}
            onClick={onGenerateQR}
          >
            Generar QR
          </Button>
        </div>

        {playlistId && (
          <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-green-500/10 text-green-600 border border-green-500/20 animate-in fade-in slide-in-from-right-4 duration-500">
            <span className="material-symbols-outlined text-xl">
              check_circle
            </span>
            <span className="text-sm font-medium">
              {playlistName} guardada ID:{" "}
              <span className="font-bold underline">{playlistId}</span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
