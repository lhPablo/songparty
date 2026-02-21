"use client";

import { useState, useRef, useEffect } from "react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useSearchParams } from "next/navigation";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";
import { useIsMounted } from "../shared/useIsMounted";

export const usePlaylistTitle = () => {
  const { playlistName, setPlaylistName } = usePlaylistStore();
  const searchParams = useSearchParams();
  const urlToken = searchParams.get(URL_TOKEN_PARAM);

  const isMounted = useIsMounted();
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = isMounted ? !!urlToken : false;
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
    isOwner,
  };
};
