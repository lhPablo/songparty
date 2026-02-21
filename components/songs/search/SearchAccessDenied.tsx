import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";

interface SearchAccessDeniedProps {
  playlistId: string;
  token?: string;
}

export const SearchAccessDenied = ({
  playlistId,
  token,
}: SearchAccessDeniedProps) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center space-y-4 p-8">
        <span className="material-symbols-outlined text-6xl text-amber-500">
          lock
        </span>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Lista Bloqueada
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Esta lista está en modo solo lectura y no se pueden añadir más
          canciones.
        </p>
        <Link
          href={`/playlist/${playlistId}${token ? `?${URL_TOKEN_PARAM}=${token}` : ""}`}
        >
          <Button
            icon="arrow_back"
            className="mt-4 px-6 h-12 rounded-xl text-base"
          >
            Volver a la lista
          </Button>
        </Link>
      </div>
    </main>
  );
};
