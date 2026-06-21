import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";
import { RadarChart } from "@/components/qids/radar-chart";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export const Route = createFileRoute("/app/iqp")({
  head: () => ({ meta: [{ title: "IQP — Individual Quotient Profile" }] }),
  component: IQP,
});

const QUOTIENTS = [
  { key: "IQ", label: "Cognitive", value: 74, band: "yellow", color: "var(--iq)" },
  { key: "EQ", label: "Emotional", value: 82, band: "green", color: "var(--eq)" },
  { key: "SQ", label: "Social", value: 61, band: "yellow", color: "var(--sq)" },
  { key: "AQ", label: "Adaptive", value: 88, band: "green", color: "var(--aq)" },
];

const BANDS = {
  green: { name: "Green · Developed", desc: "Consistent expression across contexts." },
  yellow: { name: "Yellow · Emerging", desc: "Capable, with context-dependent variance." },
  red: { name: "Red · Developing", desc: "Targeted practice recommended." },
};

const PARAMETERS = [
  { q: "IQ", items: [["Analytical reasoning", 78], ["Pattern recognition", 71], ["Working memory", 73], ["Synthesis", 68], ["Numerical fluency", 80]] },
  { q: "EQ", items: [["Self-awareness", 84], ["Empathy", 86], ["Regulation", 79], ["Motivation", 80], ["Relational depth", 82]] },
  { q: "SQ", items: [["Collaboration", 64], ["Communication", 58], ["Citizenship", 67], ["Contextual judgment", 55], ["Influence", 60]] },
  { q: "AQ", items: [["Resilience", 90], ["Learning agility", 87], ["Ambiguity tolerance", 84], ["Adaptive response", 88], ["Recovery", 89]] },
] as const;

function IQP() {
  return (
    <AppShell
      eyebrow="INDIVIDUAL QUOTIENT PROFILE · INTERIM"
      title="Aarav Kumar."
      action={
        <div className="flex gap-2 no-print">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link to="/app/report"><Download className="w-4 h-4" /> Export Report</Link>
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Radar */}
        <div className="col-span-12 lg:col-span-7 border border-border p-8 lg:p-10">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="label-eyebrow-gold mb-2">QUOTIENT PROFILE</div>
              <div className="font-display text-[22px]">Composite view</div>
            </div>
            <div className="text-right">
              <div className="num text-[42px] text-[var(--gold)] leading-none">76</div>
              <div className="text-[11px] font-mono tracking-wider text-muted-foreground mt-1">COMPOSITE</div>
            </div>
          </div>
          <div className="mt-4">
            <RadarChart data={QUOTIENTS.map(q => ({ key: q.key, label: q.key, value: q.value }))} />
          </div>
        </div>

        {/* Quotient cards */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-px bg-border border border-border">
          {QUOTIENTS.map((q) => {
            const b = BANDS[q.band as keyof typeof BANDS];
            const dot = q.band === "green" ? "var(--band-green)" : q.band === "yellow" ? "var(--band-yellow)" : "var(--band-red)";
            return (
              <div key={q.key} className="bg-background p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display text-[28px]" style={{ color: q.color }}>{q.key}</span>
                  <span className="num text-[22px]">{q.value}</span>
                </div>
                <div className="text-[12px] text-muted-foreground mb-3">{q.label}</div>
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider">
                  <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
                  <span>{b.name.split(" · ")[1].toUpperCase()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative */}
        <div className="col-span-12 lg:col-span-8 border border-border p-10">
          <div className="label-eyebrow-gold mb-4">NARRATIVE SUMMARY</div>
          <h3 className="font-display text-[26px] leading-tight mb-6 max-w-2xl">
            A resilient, emotionally attuned profile with room to strengthen social fluency under pressure.
          </h3>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-[14px] text-muted-foreground leading-relaxed">
            <p>
              Aarav demonstrates a consistent capacity to regulate, recover, and re-engage. Emotional and adaptive
              quotients sit in the developed band, supported by strong self-awareness and ambiguity tolerance.
            </p>
            <p>
              Cognitive performance is solid with measured variance in synthesis. Social intelligence is the
              priority development area — particularly contextual judgment and communication under group pressure.
            </p>
          </div>
        </div>

        {/* Bands legend */}
        <div className="col-span-12 lg:col-span-4 border border-border p-8">
          <div className="label-eyebrow mb-5">BANDING SYSTEM</div>
          {Object.entries(BANDS).map(([key, b]) => {
            const dot = key === "green" ? "var(--band-green)" : key === "yellow" ? "var(--band-yellow)" : "var(--band-red)";
            return (
              <div key={key} className="py-4 border-b border-border last:border-b-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: dot }} />
                  <span className="text-[13px]">{b.name}</span>
                </div>
                <div className="text-[12px] text-muted-foreground pl-5">{b.desc}</div>
              </div>
            );
          })}
        </div>

        {/* Parameter heatmap */}
        <div className="col-span-12 border border-border">
          <div className="px-8 py-6 border-b border-border flex items-center justify-between">
            <div>
              <div className="label-eyebrow mb-2">PARAMETER HEATMAP</div>
              <div className="font-display text-[20px]">20 parameters across 4 quotients</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {PARAMETERS.map((group) => (
              <div key={group.q} className="bg-background p-6">
                <div className="font-display text-[18px] mb-5">{group.q}</div>
                <ul className="space-y-3">
                  {group.items.map(([name, val]) => {
                    const v = val as number;
                    const tone = v >= 80 ? "var(--band-green)" : v >= 65 ? "var(--band-yellow)" : "var(--band-red)";
                    return (
                      <li key={name as string} className="flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-[12px] truncate">{name}</div>
                          <div className="mt-1.5 h-[3px] bg-[var(--surface-2)] relative">
                            <div className="absolute inset-y-0 left-0" style={{ width: `${v}%`, background: tone }} />
                          </div>
                        </div>
                        <span className="num text-[12px] text-muted-foreground w-7 text-right">{v}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="col-span-12 border border-border p-10">
          <div className="label-eyebrow-gold mb-4">DEVELOPMENT RECOMMENDATIONS</div>
          <h3 className="font-display text-[26px] leading-tight mb-8">Assessment leads to growth, not judgment.</h3>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              ["01", "Contextual judgment", "Practice structured pause-and-frame technique in three weekly meetings."],
              ["02", "Group communication", "Lead one cross-functional review per week using the QiDS facilitation kit."],
              ["03", "Synthesis", "Complete the Synthesis micro-module · 4 sessions, 25 min each."],
            ].map(([n, t, d]) => (
              <div key={n} className="bg-background p-6">
                <div className="num text-[28px] text-[var(--gold)] mb-3">{n}</div>
                <div className="text-[15px] mb-2">{t}</div>
                <div className="text-[12px] text-muted-foreground leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Button asChild variant="gold">
              <Link to="/app/roadmap">Open Development Roadmap</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
