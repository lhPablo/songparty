import { useState } from "react";
import { usePlaylistStore } from "@/lib/store/usePlaylistStore";
import { savePlaylist } from "@/lib/actions/playlist";

export const usePlaylistActions = () => {
  const { selectedSongs, playlistName, clearPlaylist } = usePlaylistStore();
  const [isSaving, setIsSaving] = useState(false);
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const handleGenerateQR = async () => {
    try {
      setIsSaving(true);
      const id = await savePlaylist(selectedSongs);
      setPlaylistId(id);
    } catch (error) {
      console.error("Error al guardar la playlist:", error);
      alert("No se pudo guardar la playlist. Inténtalo de nuevo.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    selectedSongs,
    playlistName,
    isSaving,
    playlistId,
    clearPlaylist,
    handleGenerateQR,
  };
};
