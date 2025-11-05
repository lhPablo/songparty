import { SongList } from "@/components/SongList";
import { mockSongs } from "@/lib/data/mockSongs";

export default function Home() {
  const songs = mockSongs;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 sm:items-start gap-4">
        <h1 className="text-4xl font-bold">Karaoke</h1>
        <form className="flex flex-row gap-2">
          <input type="text" placeholder="Search for a song" />
          <input type="text" placeholder="Search for a author" />
        </form>
        <SongList songs={songs} />
      </main>
    </div>
  );
}
