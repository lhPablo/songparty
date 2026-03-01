"use client";

import { TriangleAlert, RotateCcw, Home } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors");
  const tCommon = useTranslations("common");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-light to-bg-dark dark:from-bg-dark dark:to-[#0a0406]">
      <div className="w-full max-w-2xl px-6 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <TriangleAlert
              size={64}
              className="mx-auto text-primary neon-text"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t("genericTitle")}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              {t("genericMessage")}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={reset}
              className="group flex items-center justify-center gap-2 px-6 h-12 rounded-xl font-medium transition-all duration-300 bg-primary text-white hover:bg-primary/80"
            >
              <RotateCcw size={20} className="group-hover:animate-shake" />
              <span className="leading-none">{t("retry")}</span>
            </button>

            <Link
              href="/"
              className="group flex items-center justify-center gap-2 px-6 h-12 rounded-xl font-medium transition-all duration-300 bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20"
            >
              <Home size={20} className="group-hover:animate-shake" />
              <span className="leading-none">{tCommon("backToHome")}</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
