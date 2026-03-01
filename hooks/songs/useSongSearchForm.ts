"use client";

import { useRef, useCallback } from "react";
import { useSearchStore } from "@/store/useSearchStore";

export const useSongSearchForm = () => {
  const applyFilters = useSearchStore((state) => state.applyFilters);
  const appliedSongQuery = useSearchStore((state) => state.appliedSongQuery);
  const appliedAuthorQuery = useSearchStore(
    (state) => state.appliedAuthorQuery,
  );

  const songInputRef = useRef<HTMLInputElement>(null);
  const authorInputRef = useRef<HTMLInputElement>(null);

  const songCallbackRef = useCallback((node: HTMLInputElement | null) => {
    songInputRef.current = node;
    if (node) {
      node.value = appliedSongQuery;
    }
  }, []);

  const authorCallbackRef = useCallback((node: HTMLInputElement | null) => {
    authorInputRef.current = node;
    if (node) {
      node.value = appliedAuthorQuery;
    }
  }, []);

  const handleSubmit = useCallback(
    (e?: React.SyntheticEvent) => {
      if (e) e.preventDefault();
      const songValue = songInputRef.current?.value || "";
      const authorValue = authorInputRef.current?.value || "";
      applyFilters(songValue, authorValue);
    },
    [applyFilters],
  );

  return {
    songInputRef: songCallbackRef,
    authorInputRef: authorCallbackRef,
    handleSubmit,
  };
};
