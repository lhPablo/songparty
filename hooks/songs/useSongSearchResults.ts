"use client";

import { useSearchStore } from "@/store/useSearchStore";
import { useTranslations } from "next-intl";
import { Song } from "@/lib/types/domain/song";
import { SearchX, Music } from "lucide-react";

interface UseSongSearchResultsProps {
  songs: Song[];
}

export const useSongSearchResults = ({
  songs,
}: UseSongSearchResultsProps) => {
  const showLoading = useSearchStore((state) => state.showLoading);
  const showEmptyMessage = useSearchStore((state) => state.showEmptyMessage);
  const hasSearched = useSearchStore((state) => state.hasSearched);
  const t = useTranslations("search");

  const isEmpty = songs.length === 0;
  const shouldShowList = songs.length > 0;
  const shouldShowEmptyState =
    isEmpty && !showLoading && (!hasSearched || showEmptyMessage);

  const emptyStateConfig = {
    message: hasSearched
      ? t("noResults")
      : t("initialMessage"),
    icon: hasSearched ? SearchX : Music,
  };

  return {
    showLoading,
    shouldShowList,
    shouldShowEmptyState,
    emptyStateConfig,
  };
};
