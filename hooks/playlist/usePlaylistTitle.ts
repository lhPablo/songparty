"use client";

import { useState, useRef, useEffect } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsOwner } from "./useIsOwner";
import { usePlaylistPersistence } from "./usePlaylistPersistence";

export const usePlaylistTitle = () => {
  const playlistName = usePlaylistStore((state) => state.playlistName);
  const setPlaylistName = usePlaylistStore((state) => state.setPlaylistName);
  const { syncPlaylist } = usePlaylistPersistence();
  const t = useTranslations("errors");

  const [isEditing, setIsEditing] = useState(false);

  const isOwner = useIsOwner();
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
      sileo.error({ title: t("saveTitle") });
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
