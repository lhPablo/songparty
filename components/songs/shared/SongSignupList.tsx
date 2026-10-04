"use client";

import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsOwner } from "@/hooks/playlist/useIsOwner";
import { useSongSignupActions } from "@/hooks/songs/useSongSignupActions";
import { SongSignup } from "@/lib/types/domain/songSignup";

interface SongSignupListProps {
  songId: number;
  isExpanded: boolean;
}

const EMPTY_SIGNUPS: SongSignup[] = [];

export const SongSignupList = ({ songId, isExpanded }: SongSignupListProps) => {
  const t = useTranslations("songs");
  const signups = usePlaylistStore(
    (state) => state.signups[songId] ?? EMPTY_SIGNUPS,
  );
  const isOwner = useIsOwner();
  const { handleRemoveSignUp } = useSongSignupActions();

  // Managing who sings is an owner tool; guests sign out with their own button
  if (!isOwner || !isExpanded || signups.length === 0) return null;

  return (
    <ul className="flex flex-col gap-1">
      {signups.map((signup) => (
        <li
          key={signup.id}
          className="flex items-center justify-between gap-2 text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-1.5"
        >
          <span className="truncate">{signup.name}</span>
          <button
            type="button"
            onClick={() => handleRemoveSignUp(songId, signup.id)}
            className="text-gray-500 hover:text-red-400 shrink-0"
            title={t("removeSignUp")}
          >
            <X size={14} />
          </button>
        </li>
      ))}
    </ul>
  );
};
