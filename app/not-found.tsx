import Link from "next/link";
import { HeadphoneOff, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  const tCommon = await getTranslations("common");

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-bg-light to-bg-dark dark:from-bg-dark dark:to-[#0a0406]">
      <div className="w-full max-w-2xl px-6 py-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4">
            <p className="text-8xl md:text-9xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ff6ec7] to-primary tracking-tight">
              404
            </p>
            <HeadphoneOff
              size={64}
              className="mx-auto text-primary neon-text"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
              {t("message")}
            </p>
          </div>

          <Link
            href="/"
            className="group flex items-center justify-center gap-2 px-6 h-12 rounded-xl font-medium transition-all duration-300 bg-primary/10 text-primary hover:bg-primary hover:text-white border border-primary/20"
          >
            <Home
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="leading-none">{tCommon("backToHome")}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
