interface SongSearchCountProps {
  count: number;
}

export const SongSearchCount = ({ count }: SongSearchCountProps) => {
  return (
    <div className="flex items-center justify-between pb-2 border-b border-gray-200 dark:border-[#4a213c]">
      <span className="text-gray-900 dark:text-white font-bold mr-2">
        Resultados de búsqueda
      </span>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {count} canciones encontradas
      </span>
    </div>
  );
};
