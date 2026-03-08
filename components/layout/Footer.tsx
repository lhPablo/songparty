import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const Footer = async () => {
  const t = await getTranslations("footer");

  return (
    <footer className="mt-auto py-10 px-20 border-t border-[#4a213c] flex flex-col items-center gap-4 text-white/40">
      <div className="flex items-center gap-2">
        <div className="size-5 text-primary">
          <Image
            src="/logo.svg"
            alt="Song Party Party"
            width={32}
            height={32}
          />
        </div>
        <span className="font-bold text-white/60">Song Party</span>
      </div>
      <p className="text-xs text-center">{t("tagline")}</p>
    </footer>
  );
};
