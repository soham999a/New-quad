import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { Sparkles, Compass, Rocket, Star } from "lucide-react";

export const Route = createFileRoute("/app/kids")({
  head: () => ({ meta: [{ title: "AI for Kids — QiDS" }] }),
  component: Kids,
});

const MISSIONS = [
  { n: "01", t: "The Empathy Lab", d: "Help two characters understand each other.", time: "10 min", q: "EQ" },
  { n: "02", t: "Pattern Forest", d: "Find the rule hiding in the trees.", time: "8 min", q: "IQ" },
  { n: "03", t: "Bridge Builders", d: "Work with a partner to cross the river.", time: "12 min", q: "SQ" },
  { n: "04", t: "Storm Camp", d: "Decide what to do when the plan changes.", time: "9 min", q: "AQ" },
];

function Kids() {
  return (
    <AppShell
      eyebrow="MODULE · AI FOR KIDS · AGES 8–14"
      title="Learn. Wonder. Build."
      action={
        <Button variant="gold">
          <Sparkles className="w-4 h-4" /> Start today’s mission
        </Button>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Hero */}
        <div className="col-span-12 border border-border p-10 lg:p-12 relative overflow-hidden">
          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="label-eyebrow-gold mb-4">TODAY · CHAPTER 04</div>
              <h2 className="font-display text-[32px] lg:text-[40px] leading-[1.1] max-w-md">
                The Lighthouse Keeper needs your help.
              </h2>
              <p className="mt-5 text-muted-foreground max-w-md text-[14px] leading-relaxed">
                A story where every choice trains a real skill — empathy, reasoning, courage,
                or teamwork. Read, decide, and earn a node on your map.
              </p>
              <div className="mt-8 flex gap-3">
                <Button variant="gold">Continue story</Button>
                <Button variant="outline">View map</Button>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-5 flex justify-center">
              <KidsConstellation />
            </div>
          </div>
        </div>

        {/* Missions */}
        <div className="col-span-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="label-eyebrow mb-2">MISSIONS THIS WEEK</div>
              <div className="font-display text-[22px]">Four short adventures</div>
            </div>
            <Link to="/app" className="text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground">
              ALL MISSIONS →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {MISSIONS.map((m) => (
              <button key={m.n} className="bg-background p-7 text-left group transition-colors hover:bg-[var(--surface)]">
                <div className="flex items-center justify-between mb-6">
                  <span className="num text-[28px] text-[var(--gold)]">{m.n}</span>
                  <span className="label-eyebrow">{m.q}</span>
                </div>
                <div className="font-display text-[18px] mb-2">{m.t}</div>
                <div className="text-[12px] text-muted-foreground leading-relaxed mb-5">{m.d}</div>
                <div className="text-[11px] font-mono tracking-wider text-muted-foreground">{m.time.toUpperCase()}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Path + badges */}
        <div className="col-span-12 lg:col-span-8 border border-border p-8">
          <div className="label-eyebrow mb-5">LEARNING PATH</div>
          <div className="flex items-center justify-between gap-3">
            {["Start", "Empathy", "Logic", "Teamwork", "Courage", "Curiosity", "Mastery"].map((step, i) => (
              <div key={step} className="flex-1 flex flex-col items-center text-center">
                <div className={`w-10 h-10 border flex items-center justify-center rounded-full ${i <= 2 ? "bg-[var(--gold)] border-[var(--gold)] text-background" : "border-[var(--border-strong)] text-muted-foreground"}`}>
                  {i <= 2 ? <Star className="w-4 h-4" /> : i + 1}
                </div>
                <div className="text-[10px] font-mono tracking-wider mt-3 text-muted-foreground">{step.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 border border-border p-8">
          <div className="label-eyebrow mb-5">BADGES EARNED</div>
          <div className="grid grid-cols-3 gap-4">
            {[Compass, Star, Rocket].map((Icon, i) => (
              <div key={i} className="aspect-square border border-[var(--border-strong)] flex flex-col items-center justify-center gap-2">
                <Icon className="w-5 h-5 text-[var(--gold)]" />
                <span className="text-[9px] font-mono tracking-wider text-muted-foreground">EARNED</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function KidsConstellation() {
  return (
    <svg viewBox="0 0 320 240" className="w-full max-w-[320px]" aria-hidden>
      <g stroke="var(--gold)" strokeWidth="0.8" fill="none" opacity="0.7">
        <path d="M40 200 Q 120 60 280 90" />
      </g>
      {[[40,200],[100,140],[160,90],[220,110],[280,90]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 2 ? 6 : 4} fill="var(--gold)" />
          <circle cx={x} cy={y} r={12} fill="none" stroke="var(--gold)" strokeWidth="0.4" opacity="0.5" />
        </g>
      ))}
      <text x={160} y={75} textAnchor="middle" fontFamily="var(--font-display)" fontSize="11" fill="var(--muted-foreground)">CHAPTER 04</text>
    </svg>
  );
}
