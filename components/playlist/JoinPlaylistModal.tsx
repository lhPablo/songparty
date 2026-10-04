"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { UserRound } from "lucide-react";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { useJoinPlaylist } from "@/hooks/playlist/useJoinPlaylist";
import { Button } from "@/components/ui/Button";
import { MAX_PARTICIPANT_NAME_LENGTH } from "@/lib/constants/playlist";

interface JoinPlaylistModalProps {
  playlistId: string;
}

export const JoinPlaylistModal = ({ playlistId }: JoinPlaylistModalProps) => {
  const t = useTranslations("join");
  const isIdentityResolved = usePlaylistStore(
    (state) => state.isIdentityResolved,
  );
  const hasIdentity = usePlaylistStore((state) => !!state.identity);
  const { handleJoin, isJoining, error } = useJoinPlaylist(playlistId);
  const [name, setName] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = isIdentityResolved && !hasIdentity;


  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog || dialog.open) return;

    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (isJoining) return;
    handleJoin(name);
  }, [isJoining, handleJoin, name]);

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="join-dialog"
      aria-labelledby="join-playlist-title"
      onCancel={(e) => e.preventDefault()}
    >
      <div className="w-full bg-panel p-6 rounded-2xl border border-primary/20 shadow-glass flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <UserRound size={24} />
          </div>
          <h2
            id="join-playlist-title"
            className="text-white font-bold text-xl"
          >
            {t("title")}
          </h2>
          <p className="text-gray-300 text-sm">{t("hint")}</p>
        </div>

        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={t("placeholder")}
          maxLength={MAX_PARTICIPANT_NAME_LENGTH}
          className="w-full px-3 py-2 rounded-lg bg-white/5 border border-primary/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary"
        />

        {error && (
          <p className="text-red-400 text-xs text-center">{t(error)}</p>
        )}

        <Button onClick={handleSubmit} loading={isJoining} className="w-full">
          {t("submit")}
        </Button>
      </div>
    </dialog>
  );
};
