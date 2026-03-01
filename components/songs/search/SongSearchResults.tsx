"use client";

import React from "react";
import { Song } from "@/lib/types/domain/song";
import { SongList } from "../shared/SongList";
import { ListPlaceholder } from "../shared/ListPlaceholder";
import { Loading } from "@/components/ui/Loading";
import { useSongSearchResults } from "@/hooks/songs/useSongSearchResults";

interface SongSearchResultsProps {
  songs: Song[];
}

export const SongSearchResults = React.memo(
  ({ songs }: SongSearchResultsProps) => {
    const {
      showLoading,
      shouldShowList,
      shouldShowEmptyState,
      emptyStateConfig,
    } = useSongSearchResults({ songs });

    return (
      <div className="flex flex-col gap-2 min-h-[280px]">
        {shouldShowList && <SongList songs={songs} />}

        {showLoading && <Loading />}

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
