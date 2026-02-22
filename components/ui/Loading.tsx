import { LoaderCircle } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center gap-2 text-primary animate-pulse">
      <LoaderCircle size={24} className="animate-spin" />
      <span>Cargando canciones...</span>
    </div>
  );
};
