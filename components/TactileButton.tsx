import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export function TactileButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        'bg-accent text-white rounded-xl px-6 py-3 font-bold tactile-btn shadow-lg',
        className
      )}
      {...props}
    />
  );
}
