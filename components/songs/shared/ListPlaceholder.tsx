import { Icon, LucideIcon } from "lucide-react";

interface ListPlaceholderProps {
  message?: React.ReactNode;
  icon: LucideIcon;
}

export const ListPlaceholder = ({
  message,
  icon: Icon,
}: ListPlaceholderProps) => {
  return (
    <div className="mt-10 w-full flex flex-col items-center justify-center animate-in fade-in duration-700">
      <div className="neon-border rounded-2xl px-10 py-10 bg-white/5 dark:bg-primary/5 backdrop-blur-sm flex flex-col items-center text-center max-w-xl w-full">
        <div className="mb-4">
          <Icon size={64} className="text-primary neon-text" />
        </div>
        <div className="text-xl md:text-1xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          {message}
        </div>
      </div>
    </div>
  );
};
