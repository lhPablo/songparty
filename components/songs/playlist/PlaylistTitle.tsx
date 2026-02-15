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
    <div className="group relative flex items-center gap-3 max-w-full min-h-[60px]">
      {isEditing ? (
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
              className="bg-primary text-white shadow-lg shadow-primary/20 scale-110 p-2"
            />
          </div>
        </div>
      ) : (
        <div
          className="flex items-center gap-4 cursor-pointer group/title transition-all duration-300"
          onClick={startEditing}
        >
          <div className="relative group/title-container">
            <h1 className="text-text-primary tracking-tight text-[32px] md:text-[48px] font-black leading-tight select-none transition-transform duration-300 group-hover/title:scale-[1.01] pb-1">
              {playlistName}
            </h1>
            <div className="absolute bottom-0 left-0 h-1 w-full bg-transparent rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-primary/40 translate-x-[-100%] group-hover/title:translate-x-0 transition-transform duration-500 ease-out" />
            </div>
          </div>

          <div className="flex items-center opacity-100 md:opacity-0 md:-translate-x-2 md:group-hover/title:opacity-100 md:group-hover/title:translate-x-0 transition-all duration-300">
            <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-text-muted hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[20px]">
                edit
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

PlaylistTitle.displayName = "PlaylistTitle";
