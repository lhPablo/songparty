import {
  PLAYLIST_EXPIRATION_DAYS,
  PLAYLIST_EXPIRATION_MS,
} from "@/lib/constants/playlist";

interface PlaylistMetaInfoProps {
  createdAt: string;
}

export const PlaylistMetaInfo = ({ createdAt }: PlaylistMetaInfoProps) => {
  return (
    <p className="text-gray-500 dark:text-gray-400 text-sm">
      Creada el {new Date(createdAt).toLocaleDateString()}
      <span className="mx-2 opacity-50">•</span>
      <span className="text-amber-600/80 font-medium">
        Se borrará el{" "}
        {new Date(
          new Date(createdAt).getTime() + PLAYLIST_EXPIRATION_MS,
        ).toLocaleDateString()}{" "}
        (en {PLAYLIST_EXPIRATION_DAYS} días)
      </span>
    </p>
  );
};
