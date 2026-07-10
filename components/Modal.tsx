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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onFechar}
    >
      <div
        className="cartao w-full max-w-sm p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-tinta">{titulo}</span>
          <button
            onClick={onFechar}
            className="cursor-pointer text-tinta2 hover:text-tinta"
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
