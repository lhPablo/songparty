import React from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import { useSongSearchForm } from "@/lib/hooks/useSongSearchForm";

export const SongSearchForm = React.memo(() => {
  const {
    searchType,
    currentQuery,
    searchPlaceholder,
    handleTypeChange,
    handleQueryChange,
    handleSubmit,
    applyFilters,
  } = useSongSearchForm();

  const searchOptions = [
    { value: "song", label: "Título", icon: "title" },
    { value: "author", label: "Artista", icon: "person" },
  ];

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
          placeholder={searchPlaceholder}
          value={currentQuery}
          onChange={handleQueryChange}
          onSearch={applyFilters}
        />
      </div>
    </form>
  );
});

SongSearchForm.displayName = "SongSearchForm";
