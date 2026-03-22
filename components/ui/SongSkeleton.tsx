import { Music } from "lucide-react";

interface SongSkeletonProps {
  delay?: string;
}

export const SongSkeleton = ({ delay = "0ms" }: SongSkeletonProps) => (
    <div
      className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl animate-pulse w-full min-w-0"
    style={{ animationDelay: delay }}
  >
    <div className="size-10 md:size-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
      <Music size={18} className="text-primary/30" />
    </div>
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-primary/10 rounded-full w-3/4" />
      <div className="h-3 bg-primary/5 rounded-full w-1/2" />
    </div>
  </div>
);
