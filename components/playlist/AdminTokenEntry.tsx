"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { KeyRound } from "lucide-react";
import { useOwnerTokenEntry } from "@/hooks/playlist/useOwnerTokenEntry";
import { Button } from "@/components/ui/Button";

interface AdminTokenEntryProps {
  playlistId: string;
}

export const AdminTokenEntry = ({ playlistId }: AdminTokenEntryProps) => {
  const t = useTranslations("share");
  const { isVerifying, isInvalid, handleSubmitToken } =
    useOwnerTokenEntry(playlistId);

  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (!value.trim() || isVerifying) return;
    handleSubmitToken(value);
  }, [value, isVerifying, handleSubmitToken]);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary font-medium mx-auto"
      >
        <KeyRound size={14} />
        {t("iAmAdmin")}
      </button>
    );
  }

  return (
    <div className="w-full max-w-xs mx-auto flex flex-col gap-2">
      <p className="text-[#cc8eb8] text-xs opacity-80 text-center">
        {t("adminTokenEntryHint")}
      </p>
      <div className="flex items-center gap-2">
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder={t("adminTokenPlaceholder")}
          className="flex-1 min-w-0 px-3 py-1.5 rounded-lg bg-white/5 border border-primary/20 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-primary"
        />
        <Button
          variant="secondary"
          onClick={handleSubmit}
          loading={isVerifying}
          className="h-9 px-3 text-xs"
        >
          {t("unlockAdmin")}
        </Button>
      </div>
      {isInvalid && (
        <p className="text-red-400 text-xs text-center">
          {t("adminTokenInvalid")}
        </p>
      )}
    </div>
  );
};
