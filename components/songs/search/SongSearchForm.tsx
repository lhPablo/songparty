"use client";

import React from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { useSongSearchForm } from "@/hooks/songs/useSongSearchForm";
import { Search, Type, User } from "lucide-react";

export const SongSearchForm = React.memo(() => {
  const { songInputRef, authorInputRef, handleSubmit } = useSongSearchForm();

  return (
    <form
      className="w-full bg-panel/40 p-6 md:p-8 rounded-xl border border-border-dark shadow-glass"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-5">
          <SearchInput
            ref={authorInputRef}
            icon={User}
            label="Artista"
            placeholder="Escribe el nombre del artista..."
            showButton={false}
          />
        </div>

        <div className="md:col-span-5">
          <SearchInput
            ref={songInputRef}
            icon={Type}
            label="Título de la canción"
            placeholder="Escribe el título de la canción..."
            showButton={false}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full h-14 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-primary/20 cursor-pointer"
          >
            <Search className="size-5" />
            <span className="md:hidden lg:inline">Buscar</span>
          </button>
        </div>
      </div>
    </form>
  );
});

SongSearchForm.displayName = "SongSearchForm";
