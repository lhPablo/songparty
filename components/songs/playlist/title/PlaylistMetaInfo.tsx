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
    <p className="text-gray-500 dark:text-gray-400 text-xs whitespace-nowrap">
      {t("createdAt", { date: formatDate(createdAt) })}
      <span className="mx-1.5 opacity-50">•</span>
      <span className="text-amber-600/80 font-medium">
        {t("expiresAt", { date: formatDate(expiresAt), days: remainingDays })}
      </span>
    </p>
  );
};
