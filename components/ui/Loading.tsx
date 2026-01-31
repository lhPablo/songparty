export const Loading = () => {
  return (
    <div className="flex items-center gap-2 text-primary animate-pulse">
      <span className="material-symbols-outlined animate-spin">
        progress_activity
      </span>
      <span>Cargando canciones...</span>
    </div>
  );
};
