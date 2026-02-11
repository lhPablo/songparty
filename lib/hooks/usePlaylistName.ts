import { useState, useRef, useEffect } from "react";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";

export const usePlaylistName = () => {
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

  // Sync tempName with store when playlistName changes externally
  useEffect(() => {
    setTempName(playlistName);
  }, [playlistName]);

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

  const startEditing = () => setIsEditing(true);

  return {
    playlistName,
    isEditing,
    tempName,
    inputRef,
    setTempName,
    handleSave,
    handleKeyDown,
    startEditing,
  };
};
