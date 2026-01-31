import { Song } from "@/lib/types/domain/song";
import Image from "next/image";
import React, { useState } from "react";
import { ALLOWED_IMAGE_DOMAINS } from "@/lib/constants/images";

export const SongItem = React.memo(({ song }: { song: Song }) => {
  console.log("Renderizando SongItem");
  const [imgError, setImgError] = useState(false);

  // Check if domain is allowed for next/image
  const isAllowedDomain = (url: string) => {
    try {
      const hostname = new URL(url).hostname;
      return ALLOWED_IMAGE_DOMAINS.some((domain) => hostname.endsWith(domain));
    } catch {
      return false;
    }
  };

  const useNextImage = isAllowedDomain(song.coverUrl);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-gray-200 dark:bg-primary/10 relative overflow-hidden flex items-center justify-center">
          {!imgError ? (
            useNextImage ? (
              <Image
                src={song.coverUrl}
                alt={`Portada del álbum ${song.title}`}
                fill
                sizes="56px"
                className="object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={song.coverUrl}
                alt={`Portada del álbum ${song.title}`}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            )
          ) : (
            <span className="material-symbols-outlined text-gray-400">
              music_note
            </span>
          )}
        </div>
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-primary transition-colors">
            {song.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">{song.artist}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center size-12 rounded-full bg-primary text-white neon-glow hover:scale-110 transition-transform">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </>
  );
});

SongItem.displayName = "SongItem";
