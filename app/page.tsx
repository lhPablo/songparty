import { SongList } from "@/components/songs/SongList";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <div className="mb-8">
            <h1 className="text-gray-900 dark:text-white tracking-tight text-[40px] font-bold leading-tight text-center pt-6">
              Búsqueda de <span className="text-primary">Canciones</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
              Aplique un filtro para empezar a buscar
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 mb-8 w-full">
            <SongList />
          </div>
        </section>
      </div>
    </main>
  );
}
