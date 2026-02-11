import { Button } from "@/components/ui/Button";

interface PlaylistActionsBarProps {
  onClear: () => void;
  onGenerateQR: () => void;
  isSaving: boolean;
  playlistId: string | null;
  playlistName: string;
}

export const PlaylistActionsBar = ({
  onClear,
  onGenerateQR,
  isSaving,
  playlistId,
  playlistName,
}: PlaylistActionsBarProps) => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-4 w-full justify-between">
        <div className="flex gap-2">
          <Button variant="danger" icon="delete" onClick={onClear}>
            Vaciar lista
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
