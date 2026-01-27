import { useSongFilters } from "@/lib/providers/SongFilterProvider";
import React, { useState } from "react";
import { ChangeEvent } from "react";
import { SearchInput } from "../ui/SearchInput";
import { ToggleGroup } from "../ui/ToggleGroup";

export const SongSearchForm = React.memo(() => {
  const { songQuery, authorQuery, setSongQuery, setAuthorQuery } =
    useSongFilters();
  const [searchType, setSearchType] = useState<"song" | "author">("song");

  console.log("Renderizando Formulario de busqueda");

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchType === "song") {
      setSongQuery(e.target.value);
    } else {
      setAuthorQuery(e.target.value);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex flex-col items-center gap-4 mb-8">
        <ToggleGroup
          name="searchType"
          value={searchType}
          onChange={(val) => setSearchType(val as "song" | "author")}
          options={[
            { value: "author", label: "Artista", icon: "person" },
            { value: "song", label: "Título", icon: "title" },
          ]}
        />
      </div>
      <div className="w-full max-w-4xl mx-auto mb-4">
        <SearchInput
          placeholder={
            searchType === "song"
              ? "Escribe el título de la canción..."
              : "Escribe el nombre del artista..."
          }
          value={searchType === "song" ? songQuery : authorQuery}
          onChange={handleQueryChange}
        />
      </div>
    </form>
  );
});

SongSearchForm.displayName = "SongSearchForm";
