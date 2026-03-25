// AeroIcon Component
import { cn } from '@/lib/utils';

interface AeroIconProps {
  icon: string;
  name: string;
  onClick?: () => void;
  animationDelay?: number;
  className?: string;
}

export const AeroIcon: React.FC<AeroIconProps> = ({
  icon,
  name,
  onClick,
  animationDelay = 0,
  className,
}) => {
  const delayClass = animationDelay === 0 
    ? 'aero-float' 
    : animationDelay === 0.5 
    ? 'aero-float-delay-1'
    : animationDelay === 1
    ? 'aero-float-delay-2'
    : animationDelay === 1.5
    ? 'aero-float-delay-3'
    : 'aero-float-delay-4';

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center gap-3',
        'transition-all duration-300',
        className
      )}
    >
      {/* Icon Circle */}
      <div
        className={cn(
          'aero-icon-btn w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
          'flex items-center justify-center',
          delayClass,
          'cursor-pointer'
        )}
        style={{ animationDelay: `${animationDelay}s` }}
      >
        {/* Inner glow */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/60 to-transparent" />
        
        {/* Icon */}
        <span className="relative text-3xl sm:text-4xl md:text-5xl drop-shadow-lg">
          {icon}
        </span>
        
        {/* Shine effect */}
        <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-white/60 blur-sm" />
      </div>
      
      {/* Label */}
      <span 
        className={cn(
          'px-4 py-1.5 rounded-full',
          'aero-glass text-sm sm:text-base font-semibold',
          'text-sky-800 whitespace-nowrap',
          'opacity-90 group-hover:opacity-100',
          'transition-all duration-300',
          'group-hover:scale-105'
        )}
      >
        {name}
      </span>
      
      {/* Floating particles */}
      <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-sky-300/60 animate-pulse" />
      <div className="absolute -bottom-1 -left-3 w-2 h-2 rounded-full bg-cyan-300/50 animate-pulse delay-300" />
    </button>
  );
};

export default AeroIcon;
