"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Check, Mic, Plus, X } from "lucide-react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useIsOwner } from "@/hooks/playlist/useIsOwner";
import { useSongSignupActions } from "@/hooks/songs/useSongSignupActions";
import { SongSignup } from "@/lib/types/domain/songSignup";

interface SongSignupControlProps {
  songId: number;
  onToggleList: () => void;
}

const EMPTY_SIGNUPS: SongSignup[] = [];

export const SongSignupControl = ({
  songId,
  onToggleList,
}: SongSignupControlProps) => {
  const t = useTranslations("songs");
  const signups = usePlaylistStore(
    (state) => state.signups[songId] ?? EMPTY_SIGNUPS,
  );
  const myParticipantId = usePlaylistStore(
    (state) => state.identity?.participantId ?? null,
  );
  const isOwner = useIsOwner();
  const isIdentityResolved = usePlaylistStore(
    (state) => state.isIdentityResolved,
  );
  const { handleSignUp, handleRemoveSignUp } = useSongSignupActions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const count = signups.length;
  const mySignup = myParticipantId
    ? signups.find((s) => s.participantId === myParticipantId)
    : undefined;

  const handleAction = useCallback(async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (mySignup) {
        await handleRemoveSignUp(songId, mySignup.id);
      } else {
        await handleSignUp(songId);
      }
    } finally {
      setIsSubmitting(false);
      setIsHovered(false);
    }
  }, [isSubmitting, mySignup, handleRemoveSignUp, handleSignUp, songId]);

  // Wait for the identity so the count and the action appear together,
  if (!isIdentityResolved) return null;

  const isRemoving = !!mySignup && isHovered;

  const ActionIcon = mySignup ? (isRemoving ? X : Check) : Plus;
  const actionLabel = mySignup
    ? isRemoving
      ? t("signOut")
      : t("signedUp")
    : t("signUp");

  const actionClasses = mySignup
    ? isRemoving
      ? "bg-red-500 text-white"
      : "bg-green-500 text-white"
    : isHovered
      ? "bg-primary text-white"
      : "";

  const countClasses = "flex items-center gap-1 px-3 py-1";

  return (
    <div className="inline-flex items-stretch rounded-full ring-1 ring-primary/20 bg-primary/10 text-primary text-xs font-bold overflow-hidden">
      {myParticipantId && (
        <button
          type="button"
          onClick={handleAction}
          // Touch taps also fire mouse events: only a real mouse previews the sign out
          onPointerEnter={(e) =>
            e.pointerType === "mouse" && setIsHovered(true)
          }
          onPointerLeave={() => setIsHovered(false)}
          disabled={isSubmitting}
          aria-label={actionLabel}
          title={actionLabel}
          className={`flex items-center gap-1 px-3 py-1 transition-all disabled:opacity-50 ${actionClasses} border-r border-primary/20`}
        >
          <ActionIcon size={14} />
          {/* Icon only on mobile so the song row's second line always fits */}
          <span className="hidden sm:grid">
            {[t("signUp"), t("signedUp"), t("signOut")].map((label) => (
              <span
                key={label}
                aria-hidden={label !== actionLabel}
                className={`col-start-1 row-start-1 text-center ${
                  label === actionLabel ? "visible" : "invisible"
                }`}
              >
                {label}
              </span>
            ))}
          </span>
        </button>
      )}

      {/* Only the owner can open the list of names; guests just see the count */}
      {isOwner && count > 0 ? (
        <button
          type="button"
          onClick={onToggleList}
          title={t("signupsCount", { count })}
          className={`${countClasses} hover:brightness-125 transition-all`}
        >
          <Mic size={14} />
          {count}
        </button>
      ) : (
        <span title={t("signupsCount", { count })} className={countClasses}>
          <Mic size={14} />
          {count}
        </span>
      )}
    </div>
  );
};
