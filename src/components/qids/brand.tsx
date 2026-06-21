import { Link } from "@tanstack/react-router";

export function MatrixMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  // Stylized M with connected nodes — derived from brand logo
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect x="10" y="12" width="6" height="40" fill="currentColor" opacity="0.85" />
      <rect x="48" y="12" width="6" height="40" fill="currentColor" opacity="0.85" />
      <line x1="16" y1="18" x2="48" y2="46" stroke="currentColor" strokeWidth="1" />
      <line x1="48" y1="18" x2="16" y2="46" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="46" x2="48" y2="46" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <circle cx="16" cy="18" r="1.8" fill="currentColor" />
      <circle cx="48" cy="18" r="1.8" fill="currentColor" />
      <circle cx="16" cy="46" r="1.8" fill="currentColor" />
      <circle cx="48" cy="46" r="1.8" fill="currentColor" />
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ to = "/", subtitle = false }: { to?: string; subtitle?: boolean }) {
  return (
    <Link to={to} className="inline-flex items-center gap-3 group">
      <span className="text-[var(--gold)]">
        <MatrixMark size={26} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display tracking-[0.32em] text-[13px] text-foreground">
          QiDS
        </span>
        {subtitle && (
          <span className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground mt-1">
            INTELLIGENCE · DEVELOPMENT · SYSTEM
          </span>
        )}
      </span>
    </Link>
  );
}
