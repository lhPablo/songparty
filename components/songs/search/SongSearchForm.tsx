"use client";

import React from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { useSongSearchForm } from "@/hooks/songs/useSongSearchForm";
import { Type, User } from "lucide-react";

const searchOptions = [
  { value: "song", label: "Título", icon: Type },
  { value: "author", label: "Artista", icon: User },
];

export const SongSearchForm = React.memo(() => {
  const {
    inputRef,
    searchType,
    searchPlaceholder,
    handleTypeChange,
    handleSubmit,
    applyFilters,
  } = useSongSearchForm();

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-4 mb-8">
        <ToggleGroup
          name="searchType"
          value={searchType}
          onChange={handleTypeChange}
          options={searchOptions}
        />
      </div>
      <div className="w-full max-w-4xl mx-auto mb-4">
        <SearchInput
          ref={inputRef}
          placeholder={searchPlaceholder}
          onSearch={applyFilters}
        />
      </div>
    </form>
  );
});

SongSearchForm.displayName = "SongSearchForm";
