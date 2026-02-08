import { SongSearchSection } from "@/components/songs/search/SongSearchSection";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex-1 flex flex-col items-center">
        <section className="layout-content-container flex flex-col w-full max-w-7xl flex-1 py-8 px-4">
          <div className="mb-8">
            <h1 className="text-gray-900 dark:text-white tracking-tight text-[40px] font-bold leading-tight text-center pt-6">
              Búsqueda de <span className="text-primary">Canciones</span>
            </h1>
          </div>
          <div className="flex flex-col items-center gap-4 mb-8 w-full">
            <SongSearchSection />
          </div>
        </section>
      </div>
    </main>
  );
}
