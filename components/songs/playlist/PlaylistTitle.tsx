"use client";

import { useState, useRef, useEffect } from "react";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";

import { IconButton } from "@/components/ui/IconButton";

export const PlaylistTitle = () => {
  const { playlistName, setPlaylistName } = usePlaylistStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(playlistName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmed = tempName.trim();
    if (trimmed) {
      setPlaylistName(trimmed);
    } else {
      setTempName(playlistName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setTempName(playlistName);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2 group max-w-full">
      {isEditing ? (
        <div className="relative flex items-center flex-1 max-w-md">
          <input
            ref={inputRef}
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-b-2 border-primary text-gray-900 dark:text-white tracking-tight text-[32px] md:text-[40px] font-bold leading-tight outline-none w-full pb-1 animate-in fade-in duration-300"
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
            onClick={() => setIsEditing(true)}
            title="Editar nombre"
          />
        </>
      )}
    </div>
  );
};
