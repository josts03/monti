import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * The two button styles used across the whole site.
 * Primary = the action we want (start a project).
 * Ghost = secondary actions (browse work, see pricing).
 */

export function PrimaryLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2 bg-[#6da2ff] text-black font-medium uppercase tracking-wider text-sm px-8 py-4',
        'hover:bg-[#8ab5ff] hover:gap-3 transition-all duration-300',
        className
      )}
    >
      {children}
      <ArrowRight className="w-4 h-4" />
    </Link>
  );
}

export function GhostLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={cn(
        'inline-flex items-center gap-2 border border-white/20 text-white font-medium uppercase tracking-wider text-sm px-8 py-4',
        'hover:border-white/60 hover:bg-white/5 transition-all duration-300',
        className
      )}
    >
      {children}
    </Link>
  );
}
