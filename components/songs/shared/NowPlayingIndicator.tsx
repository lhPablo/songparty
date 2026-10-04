"use client";

import { useTranslations } from "next-intl";

const BAR_DELAYS_MS = [0, 150, 300];

interface NowPlayingIndicatorProps {
  barClassName?: string;
}

export const NowPlayingIndicator = ({
  barClassName = "bg-primary",
}: NowPlayingIndicatorProps) => {
  const t = useTranslations("songs");

  return (
    <div
      className="flex items-center gap-2 shrink-0"
      role="status"
      aria-label={t("nowPlaying")}
      title={t("nowPlaying")}
    >
      <div className="flex items-end gap-[3px] h-4">
        {BAR_DELAYS_MS.map((delay, index) => (
          <span
            key={index}
            className={`w-[3px] h-full rounded-full ${barClassName} origin-bottom animate-equalizer`}
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
    </div>
  );
};
