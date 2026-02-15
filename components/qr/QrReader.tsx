export const QrReader = () => {
  return (
    <div className="bg-gradient-to-br from-[#4a213c] to-[#230f1c] p-8 rounded-2xl border border-primary/20 shadow-2xl shadow-primary/10 sticky top-24">
      <div className="flex flex-col items-center text-center gap-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-black font-display tracking-tight text-white">
            ¡Comparte la lista!
          </h3>
          <p className="text-[#cc8eb8] text-sm">
            Tus amigos pueden escanear y añadir temas en tiempo real.
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-inner shadow-black/20">
          <div className="size-48 bg-white relative overflow-hidden flex items-center justify-center">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_#230f1c_3px,_transparent_3px)] bg-[size:12px_12px]"></div>
            <div className="absolute inset-0 border-[14px] border-white"></div>
            <div className="absolute size-12 bg-[#230f1c] top-0 left-0 border-4 border-white"></div>
            <div className="absolute size-12 bg-[#230f1c] top-0 right-0 border-4 border-white"></div>
            <div className="absolute size-12 bg-[#230f1c] bottom-0 left-0 border-4 border-white"></div>
            <div className="absolute size-12 bg-primary/20 flex items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-primary text-2xl">
                qr_code_2
              </span>
            </div>
          </div>
        </div>
        <div className="w-full space-y-3">
          <button
            className="w-full flex items-center justify-center gap-2 bg-white text-background-dark font-bold py-3 px-6 rounded-full hover:bg-gray-100 transition-all shadow-lg active:scale-95"
            onClick={() => window.print()}
          >
            <span className="material-symbols-outlined">print</span>
            Versión para imprimir
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 px-6 rounded-full hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/30">
            <span className="material-symbols-outlined text-[20px]">
              content_copy
            </span>
            Copiar Link
          </button>
        </div>
      </div>
    </div>
  );
};
