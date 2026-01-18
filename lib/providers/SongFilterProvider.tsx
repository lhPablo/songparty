'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface SongFilterContextType {
    songQuery: string;
    authorQuery: string;
    debouncedSongQuery: string;
    debouncedAuthorQuery: string;
    setSongQuery: (value: string) => void;
    setAuthorQuery: (value: string) => void;
}

const SongFilterContext = createContext<SongFilterContextType | undefined>(undefined);

export const SongFilterProvider = ({ children }: { children: ReactNode }) => {
    const [songQuery, setSongQuery] = useState('');
    const [authorQuery, setAuthorQuery] = useState('');

    const debouncedSongQuery = useDebounce(songQuery);
    const debouncedAuthorQuery = useDebounce(authorQuery);

    return (
        <SongFilterContext.Provider value={{
            songQuery,
            authorQuery,
            debouncedSongQuery,
            debouncedAuthorQuery,
            setSongQuery,
            setAuthorQuery
        }}>
            {children}
        </SongFilterContext.Provider>
    );
};

export const useSongFilters = () => {
    const context = useContext(SongFilterContext);
    if (!context) throw new Error('useSongFilter must be used within SongFilterProvider');
    return context;
};
