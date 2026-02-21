"use client";

import { usePlaylistTitle } from "@/hooks/playlist/usePlaylistTitle";
import { PlaylistTitleEdit } from "./PlaylistTitleEdit";
import { PlaylistTitleView } from "./PlaylistTitleView";

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
          playlistName={playlistName}
          isOwner={isOwner}
          startEditing={startEditing}
        />
      )}
    </div>
  );
};

PlaylistTitle.displayName = "PlaylistTitle";
