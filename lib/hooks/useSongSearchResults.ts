import { useSearchStore } from "@/lib/store/useSearchStore";
import { Song } from "@/lib/types/domain/song";

interface UseSongSearchResultsProps {
  songs: Song[];
  hasSearched: boolean;
}

export const useSongSearchResults = ({
  songs,
  hasSearched,
}: UseSongSearchResultsProps) => {
  const showLoading = useSearchStore((state) => state.showLoading);
  const showEmptyMessage = useSearchStore((state) => state.showEmptyMessage);

  const isEmpty = songs.length === 0;
  const shouldShowList = songs.length > 0;
  const shouldShowEmptyState = isEmpty && showEmptyMessage && !showLoading;

  const emptyStateConfig = {
    message: hasSearched
      ? "No se han encontrado canciones, prueba con otra búsqueda"
      : "Busca tus canciones favoritas para empezar la fiesta",
    icon: hasSearched ? "search_off" : "library_music",
  };

  return {
    showLoading,
    shouldShowList,
    shouldShowEmptyState,
    emptyStateConfig,
  };
};
