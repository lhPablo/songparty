"use client";

import { IconButton } from "@/components/ui/IconButton";
import { TitleInput } from "@/components/ui/TitleInput";

interface PlaylistTitleEditProps {
  tempName: string;
  setTempName: (name: string) => void;
  handleSave: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export const PlaylistTitleEdit = ({
  tempName,
  setTempName,
  handleSave,
  handleKeyDown,
  inputRef,
}: PlaylistTitleEditProps) => {
  return (
    <div className="flex items-center flex-1 max-w-2xl">
      <TitleInput
        ref={inputRef}
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder="Nombre de la lista..."
      />
      <div className="flex items-center gap-1 ml-4 animate-in slide-in-from-left-4 duration-500">
        <IconButton
          icon="check"
          onMouseDown={(e) => {
            e.preventDefault();
            handleSave();
          }}
          title="Guardar nombre"
          className="bg-primary text-white shadow-lg shadow-primary/20 p-2"
        />
      </div>
    </div>
  );
};

PlaylistTitleEdit.displayName = "PlaylistTitleEdit";
