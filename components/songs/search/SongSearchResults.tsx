"use client";

import React from "react";
import { Song } from "@/lib/types/domain/song";
import { SongList } from "../shared/SongList";
import { ListPlaceholder } from "../shared/ListPlaceholder";
import { Loading } from "@/components/ui/Loading";
import { useSongSearchResults } from "@/hooks/songs/useSongSearchResults";

interface SongSearchResultsProps {
  songs: Song[];
  hasSearched?: boolean;
}

export const SongSearchResults = React.memo(
  ({ songs, hasSearched = false }: SongSearchResultsProps) => {
    const {
      showLoading,
      shouldShowList,
      shouldShowEmptyState,
      emptyStateConfig,
    } = useSongSearchResults({ songs, hasSearched });

    return (
      <div className="flex flex-col gap-2">
        {shouldShowList && <SongList songs={songs} />}

        {showLoading && (
          <div className="h-20 flex items-center justify-center">
            <Loading />
          </div>
        )}

        {shouldShowEmptyState && (
          <ListPlaceholder
            message={emptyStateConfig.message}
            icon={emptyStateConfig.icon}
          />
        )}
      </div>
    );
  },
);

SongSearchResults.displayName = "SongSearchResults";
