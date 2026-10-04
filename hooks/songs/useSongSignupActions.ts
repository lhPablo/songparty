"use client";

import { useCallback } from "react";
import { sileo } from "sileo";
import { useTranslations } from "next-intl";
import { addSongSignup, removeSongSignup } from "@/actions/playlist";
import { usePlaylistStore } from "@/store/usePlaylistStore";

export const useSongSignupActions = () => {
  const t = useTranslations("errors");

  const handleSignUp = useCallback(
    async (songId: number) => {
      const { savedPlaylistId, identity } = usePlaylistStore.getState();
      if (!savedPlaylistId || !identity) return;

      try {
        const created = await addSongSignup(
          savedPlaylistId,
          songId,
          identity.participantId,
          identity.secret,
        );

        const current = usePlaylistStore.getState().signups;
        const songSignups = current[songId] ?? [];
        if (songSignups.some((s) => s.id === created.id)) return;

        usePlaylistStore.getState().setSignups({
          ...current,
          [songId]: [...songSignups, created],
        });
      } catch {
        sileo.error({ title: t("signUp") });
      }
    },
    [t],
  );

  const handleRemoveSignUp = useCallback(
    async (songId: number, signupId: string) => {
      const state = usePlaylistStore.getState();
      if (!state.savedPlaylistId) return;

      const previous = state.signups;

      usePlaylistStore.getState().setSignups({
        ...previous,
        [songId]: (previous[songId] ?? []).filter((s) => s.id !== signupId),
      });

      try {
        await removeSongSignup(state.savedPlaylistId, songId, signupId, {
          ownerToken: state.ownerToken || undefined,
          participantId: state.identity?.participantId,
          secret: state.identity?.secret,
        });
      } catch {
        usePlaylistStore.getState().setSignups(previous);
        sileo.error({ title: t("removeSignUp") });
      }
    },
    [t],
  );

  return {
    handleSignUp,
    handleRemoveSignUp,
  };
};
