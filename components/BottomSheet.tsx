import clsx from 'clsx';
import { ReactNode } from 'react';

interface BottomSheetProps {
  open: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export function BottomSheet({ open, children, onClose }: BottomSheetProps) {
  return (
    <div
      className={clsx(
        'fixed left-0 right-0 bottom-0 max-h-[90vh] bottom-sheet-animate bottom-sheet-glass border-t border-black/10 dark:border-white/10 rounded-t-2xl shadow-glass z-50',
        open ? 'bottom-sheet-open' : 'bottom-sheet-closed'
      )}
      style={{ willChange: 'transform' }}
    >
      <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2 cursor-pointer" onClick={onClose} />
      <div className="bottom-sheet-stagger">{children}</div>
    </div>
  );
}
