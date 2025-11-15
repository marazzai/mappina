export function Overlay({ show, onClick }: { show: boolean; onClick?: () => void }) {
  return (
    <div
      className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-300 ${show ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClick}
    />
  );
}
