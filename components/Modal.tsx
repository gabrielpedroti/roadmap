"use client";

// Overlay genérico dos modais (registro manual e configurações)
export function Modal({
  titulo,
  aberto,
  onFechar,
  children,
}: {
  titulo: string;
  aberto: boolean;
  onFechar: () => void;
  children: React.ReactNode;
}) {
  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onFechar}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-borda bg-cartao p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[13px] font-semibold text-texto">{titulo}</span>
          <button
            onClick={onFechar}
            className="cursor-pointer text-suave hover:text-texto"
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
