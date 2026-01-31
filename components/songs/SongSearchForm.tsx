import React, { useState, ChangeEvent, useMemo } from "react";
import { SearchInput } from "../ui/SearchInput";
import { ToggleGroup } from "../ui/ToggleGroup";
import { useSongFilters } from "@/lib/providers/SongFilterProvider";

export const SongSearchForm = React.memo(() => {
  const { songQuery, authorQuery, setSongQuery, setAuthorQuery, applyFilters } =
    useSongFilters();
  const [searchType, setSearchType] = useState<"song" | "author">("song");

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchType === "song") {
      setSongQuery(e.target.value);
    } else {
      setAuthorQuery(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const searchOptions = [
    { value: "song", label: "Título", icon: "title" },
    { value: "author", label: "Artista", icon: "person" },
  ];

  const searchPlaceholder = useMemo(() => {
    switch (searchType) {
      case "song":
        return "Escribe el título de la canción...";
      case "author":
        return "Escribe el nombre del artista...";
    }
  }, [searchType]);

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4 mb-8">
        <ToggleGroup
          name="searchType"
          value={searchType}
          onChange={(val) => setSearchType(val as "song" | "author")}
          options={searchOptions}
        />
      </div>
      <div className="w-full max-w-4xl mx-auto mb-4">
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchType === "song" ? songQuery : authorQuery}
          onChange={handleQueryChange}
          onSearch={applyFilters}
        />
      </div>
    </form>
  );
});

SongSearchForm.displayName = "SongSearchForm";
