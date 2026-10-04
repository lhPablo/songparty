"use client";

import { useSearchParams } from "next/navigation";
import { usePlaylistStore } from "@/store/usePlaylistStore";
import { URL_TOKEN_PARAM } from "@/lib/constants/playlist";

export const useIsOwner = () => {
  const ownerToken = usePlaylistStore((state) => state.ownerToken);
  const searchParams = useSearchParams();

  return !!ownerToken || !!searchParams.get(URL_TOKEN_PARAM);
};
