"use client";

import { usePlaylistTitle } from "@/hooks/playlist/usePlaylistTitle";
import { PlaylistTitleEdit } from "./PlaylistTitleEdit";
import { PlaylistTitleView } from "./PlaylistTitleView";

interface PlaylistTitleProps {
  fallbackTitle?: string;
}

export const PlaylistTitle = ({ fallbackTitle }: PlaylistTitleProps) => {
  const {
    playlistName,
    isEditing,
    tempName,
    inputRef,
    setTempName,
    handleSave,
    handleKeyDown,
    startEditing,
    isOwner,
  } = usePlaylistTitle();

  return (
    <div className="group relative flex items-center gap-3 max-w-full min-h-[60px]">
      {isEditing && isOwner ? (
        <PlaylistTitleEdit
          tempName={tempName}
          setTempName={setTempName}
          handleSave={handleSave}
          handleKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
      ) : (
        <PlaylistTitleView
          playlistName={fallbackTitle ?? playlistName}
          isOwner={isOwner}
          startEditing={startEditing}
        />
      )}
    </div>
  );
};

PlaylistTitle.displayName = "PlaylistTitle";
