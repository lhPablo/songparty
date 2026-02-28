"use client";

import { useState, useRef, useEffect } from "react";
import { sileo } from "sileo";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsMounted } from "../shared/useIsMounted";
import { usePlaylistPersistence } from "./usePlaylistPersistence";

export const usePlaylistTitle = () => {
  const playlistName = usePlaylistStore((state) => state.playlistName);
  const setPlaylistName = usePlaylistStore((state) => state.setPlaylistName);
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const { syncPlaylist } = usePlaylistPersistence();

  const isMounted = useIsMounted();
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = isMounted ? !!ownerToken : false;
  const [tempName, setTempName] = useState(playlistName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setTempName(playlistName);
  }, [playlistName]);

  const handleSave = async () => {
    const trimmed = tempName.trim();

    if (!trimmed) {
      setTempName(playlistName);
      setIsEditing(false);
      return;
    }

    setPlaylistName(trimmed);
    setIsEditing(false);

    try {
      await syncPlaylist({ title: trimmed });
    } catch {
      sileo.error({ title: "Error al guardar el título" });
    }
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
    isOwner,
  };
};
