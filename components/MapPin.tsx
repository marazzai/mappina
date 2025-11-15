import clsx from 'clsx';

interface MapPinProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  popular?: boolean;
  imgSrc?: string;
  alt?: string;
}

export function MapPin({ selected, popular, imgSrc, alt, className, ...props }: MapPinProps) {
  return (
    <div
      className={clsx(
        'absolute w-12 h-12 rounded-full border-4 bg-white shadow-lg cursor-pointer pin-animate',
        selected ? 'pin-selected border-accent' : 'opacity-80',
        popular && 'border-accent animate-pulse w-14 h-14',
        !selected && 'pin-fade',
        className
      )}
      {...props}
    >
      {imgSrc && (
        <img src={imgSrc} alt={alt} className="w-full h-full object-cover rounded-full" />
      )}
    </div>
  );
}
