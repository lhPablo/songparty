interface ListPlaceholderProps {
  message?: React.ReactNode;
  icon?: string | React.ReactNode;
}

export const ListPlaceholder = ({ message, icon }: ListPlaceholderProps) => {
  return (
    <div className="mt-10 w-full flex flex-col items-center justify-center animate-in fade-in duration-700">
      <div className="neon-border rounded-2xl px-10 py-10 bg-white/5 dark:bg-primary/5 backdrop-blur-sm flex flex-col items-center text-center max-w-xl w-full">
        {icon && (
          <div>
            {typeof icon === "string" ? (
              <span className="material-symbols-outlined !text-6xl text-primary neon-text">
                {icon}
              </span>
            ) : (
              icon
            )}
          </div>
        )}
        <div className="text-xl md:text-1xl font-medium text-gray-600 dark:text-gray-300 leading-relaxed">
          {message}
        </div>
      </div>
    </div>
  );
};
