"use client";

import { QRScanner } from "@/components/qr/QRScanner";
import { Button } from "@/components/ui/Button";
import { Divider } from "@/components/ui/Divider";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useCreatePlaylist } from "@/hooks/playlist/useCreatePlaylist";
import { PlusCircle } from "lucide-react";

interface HomeClientProps {
  t: {
    tagline: string;
    createPlaylist: string;
    creating: string;
  };
}

export function HomeClient({ t }: HomeClientProps) {
  const { createPlaylist, isCreating } = useCreatePlaylist();

  return (
    <main className="relative flex min-h-svh py-20 items-center justify-center bg-gradient-to-br from-bg-light to-bg-dark dark:from-bg-dark dark:to-[#0a0406]">
      <div className="absolute top-6 right-6">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-2xl px-6 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <h1
              className="text-5xl md:text-7xl font-black font-display bg-clip-text bg-gradient-to-r from-primary via-[#ff6ec7] to-primary tracking-tight p-2"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              Song Party
            </h1>

            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              {t.tagline}
            </p>
          </div>

          <div className="w-full max-w-md space-y-6 pt-8">
            <Button
              onClick={createPlaylist}
              disabled={isCreating}
              className="w-full h-16 text-lg font-bold rounded-2xl shadow-2xl dark:shadow-white/5"
              icon={PlusCircle}
            >
              {isCreating ? t.creating : t.createPlaylist}
            </Button>

            <Divider />

            <QRScanner />
          </div>
        </div>
      </div>
    </main>
  );
}
