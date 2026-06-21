import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Wordmark } from "./brand";
import {
  LayoutGrid,
  ClipboardList,
  Compass,
  BookOpen,
  FileText,
  Sparkles,
  Beaker,
  ChevronRight,
} from "lucide-react";

const NAV = [
  { to: "/app", label: "Overview", icon: LayoutGrid, exact: true },
  { to: "/app/assessment", label: "Assessment", icon: ClipboardList },
  { to: "/app/iqp", label: "IQP Report", icon: FileText },
  { to: "/app/roadmap", label: "Development", icon: Compass },
  { to: "/app/framework", label: "Framework", icon: BookOpen },
  { to: "/app/report", label: "Export", icon: FileText },
];

const SECONDARY = [
  { to: "/app/kids", label: "AI for Kids", icon: Sparkles },
  { to: "/app/stem", label: "STEM · STEAM · STREAM", icon: Beaker },
];

const MODES = ["Individual", "School", "College", "Corporate", "Interview", "Custom"];

export function AppShell({
  children,
  title,
  eyebrow,
  action,
  mode = "Individual",
}: {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  action?: ReactNode;
  mode?: string;
}) {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[260px] shrink-0 flex-col border-r border-border bg-[var(--sidebar)] sticky top-0 h-screen">
        <div className="px-6 py-7 border-b border-border">
          <Wordmark to="/app" subtitle />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-6 flex flex-col gap-6">
          <div>
            <div className="label-eyebrow px-3 mb-3">System</div>
            <ul className="space-y-0.5">
              {NAV.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </ul>
          </div>
          <div>
            <div className="label-eyebrow px-3 mb-3">Modules</div>
            <ul className="space-y-0.5">
              {SECONDARY.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </ul>
          </div>
        </nav>
        <div className="px-6 py-5 border-t border-border">
          <div className="label-eyebrow mb-2">Build</div>
          <div className="font-mono text-[11px] text-muted-foreground">QiDS · v0.1 · MVP</div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top context bar */}
        <header className="h-16 border-b border-border flex items-center justify-between px-6 lg:px-10 sticky top-0 bg-background/85 backdrop-blur z-20">
          <div className="flex items-center gap-6 min-w-0">
            <Link to="/app" className="lg:hidden">
              <Wordmark to="/app" />
            </Link>
            <div className="hidden md:flex items-center gap-2 text-[12px] text-muted-foreground font-mono tracking-wider">
              <span className="text-[var(--gold)]">●</span>
              <span>MODE</span>
              <span className="text-foreground">{mode.toUpperCase()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/mode"
              className="hidden md:inline-flex items-center gap-2 text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground transition"
            >
              SWITCH MODE <ChevronRight className="w-3 h-3" />
            </Link>
            <div className="h-7 w-px bg-border hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center text-[11px] font-mono">
                AK
              </div>
              <div className="hidden md:flex flex-col leading-none">
                <span className="text-[12px]">A. Kumar</span>
                <span className="text-[10px] text-muted-foreground font-mono tracking-wider">
                  PARTICIPANT
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page header */}
        {(title || eyebrow || action) && (
          <div className="px-6 lg:px-10 pt-10 pb-8 border-b border-border">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                {eyebrow && <div className="label-eyebrow-gold mb-3">{eyebrow}</div>}
                {title && (
                  <h1 className="font-display text-[34px] md:text-[42px] leading-[1.05] tracking-tight max-w-2xl">
                    {title}
                  </h1>
                )}
              </div>
              {action}
            </div>
          </div>
        )}

        <main className="flex-1 px-6 lg:px-10 py-10">{children}</main>

        <footer className="px-6 lg:px-10 py-6 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground tracking-wider">
          <span>QiDS · QUADRANT INTELLIGENCE DEVELOPMENT SYSTEM</span>
          <span>STRUCTURE · CLARITY · DEPTH</span>
        </footer>
      </div>
    </div>
  );
}

function NavItem({
  to,
  label,
  icon: Icon,
  exact,
}: {
  to: string;
  label: string;
  icon: any;
  exact?: boolean;
}) {
  return (
    <li>
      <Link
        to={to}
        activeOptions={{ exact }}
        activeProps={{
          className:
            "bg-[var(--sidebar-accent)] text-foreground border-l-2 border-[var(--gold)]",
        }}
        inactiveProps={{
          className: "text-muted-foreground border-l-2 border-transparent hover:text-foreground hover:bg-[var(--sidebar-accent)]/60",
        }}
        className="flex items-center gap-3 px-3 py-2.5 text-[13px] transition-colors"
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </Link>
    </li>
  );
}

export { MODES };
