"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SongFilterContextType {
  songQuery: string;
  authorQuery: string;
  appliedSongQuery: string;
  appliedAuthorQuery: string;
  setSongQuery: (value: string) => void;
  setAuthorQuery: (value: string) => void;
  applyFilters: () => void;
}

const SongFilterContext = createContext<SongFilterContextType | undefined>(
  undefined,
);

export const SongFilterProvider = ({ children }: { children: ReactNode }) => {
  const [songQuery, setSongQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [appliedSongQuery, setAppliedSongQuery] = useState("");
  const [appliedAuthorQuery, setAppliedAuthorQuery] = useState("");

  const applyFilters = () => {
    setAppliedSongQuery(songQuery);
    setAppliedAuthorQuery(authorQuery);
  };

  return (
    <SongFilterContext.Provider
      value={{
        songQuery,
        authorQuery,
        appliedSongQuery,
        appliedAuthorQuery,
        setSongQuery,
        setAuthorQuery,
        applyFilters,
      }}
    >
      {children}
    </SongFilterContext.Provider>
  );
};

export const useSongFilters = () => {
  const context = useContext(SongFilterContext);
  if (!context)
    throw new Error("useSongFilter must be used within SongFilterProvider");
  return context;
};
