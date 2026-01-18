import { useSongFilters } from "@/lib/providers/SongFilterProvider";
import React from "react";
import { ChangeEvent } from "react";

export const SongSearchForm = React.memo(() => {

    const { songQuery, authorQuery, setSongQuery, setAuthorQuery } = useSongFilters();
    console.log("Renderizando Formulario de busqueda");
    const handleSongQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSongQuery(e.target.value);
    }

    const handleAuthorQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAuthorQuery(e.target.value);
    }

    return (
        <form className="flex flex-row gap-2">
            <input
                id="song-search"
                name="song-search"
                type="text"
                placeholder="Search for a song"
                value={songQuery}
                onChange={handleSongQueryChange}
            />
            <input
                id="author-search"
                name="author-search"
                type="text"
                placeholder="Search for a author"
                value={authorQuery}
                onChange={handleAuthorQueryChange}
            />
        </form>
    );
});