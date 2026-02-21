"use client";

interface PlaylistTitleViewProps {
  playlistName: string;
  isOwner: boolean;
  startEditing: () => void;
}

export const PlaylistTitleView = ({
  playlistName,
  isOwner,
  startEditing,
}: PlaylistTitleViewProps) => {
  return (
    <div
      className={`flex items-center gap-4 transition-all duration-300 ${isOwner ? "cursor-pointer group/title" : "cursor-default"}`}
      onClick={isOwner ? startEditing : undefined}
    >
      <div className="relative group/title-container">
        <h1 className="text-text-primary tracking-tight text-[32px] md:text-[48px] font-black leading-tight select-none transition-transform duration-300 group-hover/title:scale-[1.01] pb-1">
          {playlistName}
        </h1>
        {isOwner && (
          <div className="absolute bottom-0 left-0 h-1 w-full bg-transparent rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-primary/40 translate-x-[-100%] group-hover/title:translate-x-0 transition-transform duration-500 ease-out" />
          </div>
        )}
      </div>

      {isOwner && (
        <div className="flex items-center opacity-100 md:opacity-0 md:-translate-x-2 md:group-hover/title:opacity-100 md:group-hover/title:translate-x-0 transition-all duration-300">
          <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-text-muted hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </div>
        </div>
      )}
    </div>
  );
};

PlaylistTitleView.displayName = "PlaylistTitleView";
