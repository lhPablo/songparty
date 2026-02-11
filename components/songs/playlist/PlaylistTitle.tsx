"use client";

import { usePlaylistName } from "@/lib/hooks/usePlaylistName";
import { IconButton } from "@/components/ui/IconButton";
import { TitleInput } from "@/components/ui/TitleInput";

export const PlaylistTitle = () => {
  const {
    playlistName,
    isEditing,
    tempName,
    inputRef,
    setTempName,
    handleSave,
    handleKeyDown,
    startEditing,
  } = usePlaylistName();

  return (
    <div className="flex items-center gap-2 group max-w-full">
      {isEditing ? (
        <div className="relative flex items-center flex-1 max-w-md">
          <TitleInput
            ref={inputRef}
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            placeholder="Nombre de la lista..."
          />
          <IconButton
            icon="check"
            onMouseDown={(e) => {
              e.preventDefault();
              handleSave();
            }}
            title="Guardar nombre"
            className="ml-2"
          />
        </div>
      ) : (
        <>
          <h1 className="text-gray-900 dark:text-white tracking-tight text-[32px] md:text-[40px] font-bold leading-tight">
            {playlistName}
          </h1>
          <IconButton
            icon="edit"
            onClick={startEditing}
            title="Editar nombre"
          />
        </>
      )}
    </div>
  );
};

PlaylistTitle.displayName = "PlaylistTitle";
