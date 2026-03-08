"use client";

import { useTranslations, useLocale } from "next-intl";

interface PlaylistMetaInfoProps {
  createdAt: string;
  expiresAt: string;
}

export const PlaylistMetaInfo = ({
  createdAt,
  expiresAt,
}: PlaylistMetaInfoProps) => {
  const t = useTranslations("playlist");
  const locale = useLocale();

  const remainingDays = Math.max(
    0,
    Math.ceil(
      (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    ),
  );

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(locale, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  return (
    <div className="text-gray-500 dark:text-gray-400 text-[10px] sm:text-xs flex flex-wrap gap-x-2 gap-y-1">
      <span>{t("createdAt", { date: formatDate(createdAt) })}</span>
      <span className="opacity-50 hidden sm:inline">•</span>
      <span className="text-amber-600/80 font-medium">
        {t("expiresAt", {
          date: formatDate(expiresAt),
          days: remainingDays,
        })}
      </span>
    </div>
  );
};
