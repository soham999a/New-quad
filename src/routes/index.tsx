import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Wordmark, MatrixMark } from "@/components/qids/brand";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowRight, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QiDS — Human development, structured." },
      {
        name: "description",
        content:
          "QiDS is a structured intelligence and development system used by individuals, schools, colleges, and institutions to build empathy, resilience, critical thinking, and responsible citizenship.",
      },
      { property: "og:title", content: "QiDS — Human development, structured." },
      {
        property: "og:description",
        content:
          "A structured intelligence and development system for individuals, schools, colleges, and institutions.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const auth = useAuth();
  const navigate = useNavigate();
  const user = auth.user;
  const userProfile = auth.userProfile;

  const handleLogout = async () => {
    await auth.logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="px-6 lg:px-12 h-20 flex items-center justify-between border-b border-border">
        <Wordmark subtitle />
        <nav className="hidden md:flex items-center gap-10 text-[12px] font-mono tracking-[0.18em] uppercase text-muted-foreground">
          <Link to="/app/framework" className="hover:text-foreground transition">
            Framework
          </Link>
          <Link to="/mode" className="hover:text-foreground transition">
            Modes
          </Link>
          <Link to="/app/stem" className="hover:text-foreground transition">
            STEAM
          </Link>
          <Link to="/app" className="hover:text-foreground transition">
            Platform
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/app/assessment"
                className="text-[12px] font-mono tracking-wider text-foreground hover:text-gold"
              >
                Continue Assessment
              </Link>
              <button
                onClick={handleLogout}
                className="text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                Sign Out <LogOut className="w-3 h-3" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="hidden md:inline-flex text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground"
              >
                SIGN IN
              </Link>
              <Button asChild variant="gold" size="sm">
                <Link to="/mode">Begin Assessment</Link>
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 lg:px-12 pt-24 lg:pt-32 pb-24 border-b border-border overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <div className="label-eyebrow-gold mb-8">
              I · 01 — INTELLIGENCE · ARCHITECTURE · IMPACT
            </div>
            <h1 className="font-display font-light text-[44px] md:text-[68px] lg:text-[84px] leading-[1.02] tracking-[-0.025em]">
              Human development, <br />
              <span className="text-muted-foreground">structured.</span>
            </h1>
            <p className="mt-10 max-w-xl text-[16px] md:text-[18px] leading-[1.6] text-muted-foreground">
              QiDS is infrastructure for human capability. It measures, develops, and tracks the
              four quotients that define how individuals and institutions think, feel, relate, and
              adapt — IQ, EQ, SQ, and AQ.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Button asChild variant="gold" size="lg">
                <Link to="/mode">
                  Begin Assessment <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link to="/app/framework">Read the Framework</Link>
              </Button>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-5 flex items-center justify-center relative">
            <HeroDiagram />
          </div>
        </div>
      </section>

      {/* Proof / numbers */}
      <section className="px-6 lg:px-12 py-16 border-b border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {[
            ["IV", "Quotients measured", "IQ · EQ · SQ · AQ"],
            ["VI", "Operating modes", "Individual to Custom"],
            ["32", "Parameters tracked", "Across all quotients"],
            ["08–60", "Age range", "Child to professional"],
          ].map(([num, label, sub]) => (
            <div key={label} className="bg-background p-8">
              <div className="num text-[42px] text-[var(--gold)] mb-3">{num}</div>
              <div className="text-[14px] text-foreground">{label}</div>
              <div className="text-[11px] font-mono tracking-wider text-muted-foreground mt-1 uppercase">
                {sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 lg:px-12 py-24 border-b border-border">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-4">
            <div className="label-eyebrow-gold mb-6">II — METHOD</div>
            <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05] tracking-tight max-w-md">
              Four quotients. <br /> One coherent system.
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
              QiDS treats development as architecture. Each quotient is measured, banded, and
              connected to deliberate practice — not a score in isolation.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {[
              {
                k: "IQ",
                n: "01",
                t: "Cognitive Intelligence",
                d: "Reasoning, analysis, structured problem-solving and synthesis.",
              },
              {
                k: "EQ",
                n: "02",
                t: "Emotional Intelligence",
                d: "Self-awareness, empathy, regulation, and relational depth.",
              },
              {
                k: "SQ",
                n: "03",
                t: "Social Intelligence",
                d: "Collaboration, citizenship, communication, contextual judgment.",
              },
              {
                k: "AQ",
                n: "04",
                t: "Adaptive Intelligence",
                d: "Resilience, learning agility, response to ambiguity and change.",
              },
            ].map((q) => (
              <div key={q.k} className="bg-background p-8 flex flex-col">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="label-eyebrow">{q.n}</span>
                  <span className="font-display text-[28px] text-[var(--gold)]">{q.k}</span>
                </div>
                <div className="text-[15px] mb-2">{q.t}</div>
                <div className="text-[13px] text-muted-foreground leading-relaxed">{q.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modes */}
      <section className="px-6 lg:px-12 py-24 border-b border-border">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
          <div>
            <div className="label-eyebrow-gold mb-4">III — APPLICATION</div>
            <h2 className="font-display text-[36px] lg:text-[44px] leading-[1.05] tracking-tight max-w-xl">
              One framework. <br />
              Six contexts.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/mode">
              Choose a mode <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {[
            ["Individual", "Personal development and self-directed growth."],
            ["School", "K–12 cohorts with age-banded modules."],
            ["College", "Undergraduate and graduate cohorts."],
            ["Corporate", "Teams, leaders, and L&D programs."],
            ["Interview", "Hiring and selection-grade profiling."],
            ["Custom", "Bespoke configurations for institutions."],
          ].map(([name, desc]) => (
            <div key={name} className="bg-background p-8 group">
              <div className="text-[16px] mb-2">{name}</div>
              <div className="text-[13px] text-muted-foreground leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kids & STEM */}
      <section className="px-6 lg:px-12 py-24 border-b border-border">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6 border border-border p-10">
            <div className="label-eyebrow-gold mb-6">MODULE — AI FOR KIDS</div>
            <h3 className="font-display text-[28px] leading-tight mb-4 max-w-md">
              Curiosity, structured for ages 8–14.
            </h3>
            <p className="text-muted-foreground text-[14px] leading-relaxed max-w-md">
              Story-based learning, missions, and challenges that develop intelligence without
              losing the seriousness of the system.
            </p>
            <Button asChild variant="ghost" className="mt-8 -ml-3">
              <Link to="/app/kids">
                Open Kids module <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="col-span-12 lg:col-span-6 border border-border p-10">
            <div className="label-eyebrow-gold mb-6">EXTENSION — STEM · STEAM · STREAM</div>
            <h3 className="font-display text-[28px] leading-tight mb-4 max-w-md">
              Disciplinary depth, integrated with development.
            </h3>
            <p className="text-muted-foreground text-[14px] leading-relaxed max-w-md">
              For schools and colleges that want quotient development connected to science,
              technology, arts, reading, and engineering practice.
            </p>
            <Button asChild variant="ghost" className="mt-8 -ml-3">
              <Link to="/app/stem">
                View extension <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-12 py-28 text-center">
        <div className="label-eyebrow-gold mb-6">IV — BEGIN</div>
        <h2 className="font-display font-light text-[44px] lg:text-[64px] leading-[1.05] tracking-tight max-w-3xl mx-auto">
          Measurement is the beginning. <br />
          <span className="text-muted-foreground">Development is the system.</span>
        </h2>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button asChild variant="gold" size="lg">
            <Link to="/mode">Begin Assessment</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/app">Enter Platform</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-10 border-t border-border flex items-center justify-between text-[11px] font-mono tracking-wider text-muted-foreground uppercase flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[var(--gold)]">
            <MatrixMark size={20} />
          </span>
          <span>QiDS · Quadrant Intelligence Development System</span>
        </div>
        <span>© {new Date().getFullYear()} · A MATRIX system</span>
      </footer>
    </div>
  );
}

function HeroDiagram() {
  // architectural radar-ish motif
  return (
    <svg viewBox="0 0 400 400" className="w-full max-w-[420px]" aria-hidden>
      <g stroke="var(--border)" strokeWidth="0.6" fill="none">
        {[80, 130, 180].map((r) => (
          <polygon
            key={r}
            points={[0, 1, 2, 3]
              .map((i) => {
                const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
                return `${200 + Math.cos(a) * r},${200 + Math.sin(a) * r}`;
              })
              .join(" ")}
          />
        ))}
        <line x1="200" y1="20" x2="200" y2="380" />
        <line x1="20" y1="200" x2="380" y2="200" />
      </g>
      <polygon
        points={[
          [0, 140],
          [1, 95],
          [2, 165],
          [3, 110],
        ]
          .map(([i, r]) => {
            const a = (Math.PI * 2 * i) / 4 - Math.PI / 2;
            return `${200 + Math.cos(a) * r},${200 + Math.sin(a) * r}`;
          })
          .join(" ")}
        fill="var(--gold)"
        fillOpacity="0.10"
        stroke="var(--gold)"
        strokeWidth="1"
      />
      {[
        [0, 140, "IQ"],
        [1, 95, "EQ"],
        [2, 165, "SQ"],
        [3, 110, "AQ"],
      ].map(([i, r, l]) => {
        const a = (Math.PI * 2 * (i as number)) / 4 - Math.PI / 2;
        const x = 200 + Math.cos(a) * (r as number);
        const y = 200 + Math.sin(a) * (r as number);
        const lx = 200 + Math.cos(a) * 200;
        const ly = 200 + Math.sin(a) * 200;
        return (
          <g key={l as string}>
            <circle cx={x} cy={y} r="4" fill="var(--gold)" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              letterSpacing="0.2em"
              fill="var(--muted-foreground)"
            >
              {l as string}
            </text>
          </g>
        );
      })}
      <circle cx="200" cy="200" r="3" fill="var(--foreground)" />
    </svg>
  );
}
