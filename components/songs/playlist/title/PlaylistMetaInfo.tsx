interface PlaylistMetaInfoProps {
  createdAt: string;
  expiresAt: string;
}

export const PlaylistMetaInfo = ({
  createdAt,
  expiresAt,
}: PlaylistMetaInfoProps) => {
  const remainingDays = Math.max(
    0,
    Math.ceil(
      (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ),
  );

  return (
    <p className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
      Creada el{" "}
      {new Date(createdAt).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })}
      <span className="mx-1.5 opacity-50">•</span>
      <span className="text-amber-600/80 font-medium">
        Se borrará el{" "}
        {new Date(expiresAt).toLocaleDateString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        (en {remainingDays} {remainingDays === 1 ? "día" : "días"})
      </span>
    </p>
  );
};
