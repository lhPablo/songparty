"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import { useSearchStore } from "@/store/useSearchStore";
import { SearchType } from "@/lib/types/domain/search";

export const useSongSearchForm = () => {
  const applyFilters = useSearchStore((state) => state.applyFilters);
  const appliedSongQuery = useSearchStore((state) => state.appliedSongQuery);
  const appliedAuthorQuery = useSearchStore(
    (state) => state.appliedAuthorQuery,
  );

  const initialType: SearchType = appliedAuthorQuery ? "author" : "song";
  const [searchType, setSearchType] = useState<SearchType>(initialType);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputCallbackRef = useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (node) {
      const restoredValue =
        initialType === "song" ? appliedSongQuery : appliedAuthorQuery;
      node.value = restoredValue;
    }
  }, []);

  const handleTypeChange = useCallback((val: string) => {
    const newType = val as SearchType;
    setSearchType(newType);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, []);

  const handleSubmit = useCallback(
    (e?: React.SyntheticEvent) => {
      if (e) e.preventDefault();
      const query = inputRef.current?.value || "";

      if (searchType === "song") {
        applyFilters(query, "");
      } else {
        applyFilters("", query);
      }
    },
    [applyFilters, searchType],
  );

  const searchPlaceholder = useMemo(() => {
    switch (searchType) {
      case "song":
        return "Escribe el título de la canción...";
      case "author":
        return "Escribe el nombre del artista...";
    }
  }, [searchType]);

  return {
    inputRef: inputCallbackRef,
    searchType,
    searchPlaceholder,
    handleTypeChange,
    handleSubmit,
    applyFilters: handleSubmit,
  };
};
