"use client";

import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { useCreatePlaylist } from "@/hooks/playlist/useCreatePlaylist";
import { PlusCircle } from "lucide-react";

export default function HomePage() {
  const { createPlaylist, isCreating } = useCreatePlaylist();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-light to-bg-dark dark:from-bg-dark dark:to-[#0a0406]">
      <div className="w-full max-w-2xl px-6 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff6ec7] to-primary tracking-tight p-2">
              Song Party
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              Crea listas colaborativas de karaoke para tus eventos
            </p>
          </div>

          <div className="w-full max-w-md space-y-6 pt-8">
            <Button
              onClick={createPlaylist}
              disabled={isCreating}
              className="w-full h-16 text-lg font-bold rounded-2xl shadow-2xl dark:shadow-white/5"
              icon={PlusCircle}
            >
              {isCreating ? "Creando..." : "Crear Nueva Lista"}
            </Button>

            <Divider />

            <QRScanner />
          </div>
        </div>
      </div>
    </main>
  );
}
