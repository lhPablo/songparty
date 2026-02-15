import { usePlaylistStore } from "@/lib/store/usePlaylistStore";
import { savePlaylist } from "@/lib/actions/playlist";

export const usePlaylistActions = () => {
  const {
    selectedSongs,
    playlistName,
    clearPlaylist,
    isLocked,
    setIsLocked,
    isSaving,
    setIsSaving,
    savedPlaylistId,
    setSavedPlaylistId,
    isShowQr,
    setIsShowQr,
  } = usePlaylistStore();

  const handleGenerateQR = async () => {
    try {
      setIsSaving(true);
      const id = await savePlaylist(
        selectedSongs,
        playlistName,
        isLocked,
        savedPlaylistId,
      );
      setSavedPlaylistId(id);
      setIsShowQr(true);
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
    isLocked,
    setIsLocked,
    isSaving,
    savedPlaylistId,
    isShowQr,
    setIsShowQr,
    clearPlaylist,
    handleGenerateQR,
  };
};
