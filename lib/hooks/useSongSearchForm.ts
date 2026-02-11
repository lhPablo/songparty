import { useState, useMemo, ChangeEvent } from "react";
import { useSearchStore } from "@/lib/store/useSearchStore";
import { SearchType } from "@/lib/types/domain/search";

export const useSongSearchForm = () => {
  const { songQuery, authorQuery, setSongQuery, setAuthorQuery, applyFilters } =
    useSearchStore();
  const [searchType, setSearchType] = useState<SearchType>("song");

  const handleTypeChange = (val: string) => {
    const newType = val as SearchType;
    setSearchType(newType);
    setSongQuery("");
    setAuthorQuery("");
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchType === "song") {
      setSongQuery(e.target.value);
    } else {
      setAuthorQuery(e.target.value);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    applyFilters();
  };

  const searchPlaceholder = useMemo(() => {
    switch (searchType) {
      case "song":
        return "Escribe el título de la canción...";
      case "author":
        return "Escribe el nombre del artista...";
    }
  }, [searchType]);

  const currentQuery = searchType === "song" ? songQuery : authorQuery;

  return {
    searchType,
    currentQuery,
    searchPlaceholder,
    handleTypeChange,
    handleQueryChange,
    handleSubmit,
    applyFilters,
  };
};
