import { SongSkeleton } from "./SongSkeleton";

export const Loading = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <SongSkeleton delay="0ms" />
      <SongSkeleton delay="75ms" />
      <SongSkeleton delay="150ms" />
    </div>
  );
};
