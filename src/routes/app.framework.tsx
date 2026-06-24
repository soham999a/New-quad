import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";

export const Route = createFileRoute("/app/framework")({
  head: () => ({ meta: [{ title: "Framework — QiDS Methodology" }] }),
  component: Framework,
});

const PRINCIPLES = [
  [
    "I",
    "Structure precedes signal",
    "Identify the governing architecture before instruments are built.",
  ],
  [
    "II",
    "Measurement is the beginning",
    "Assessment exists to support deliberate development, never to label.",
  ],
  ["III", "Evidence over assertion", "Every banding shift is supported by triangulated evidence."],
  [
    "IV",
    "Contexts, not categories",
    "The same person is measured differently across modes and seasons.",
  ],
];

const PARAMS = [
  [
    "IQ",
    [
      "Analytical reasoning",
      "Pattern recognition",
      "Working memory",
      "Synthesis",
      "Numerical fluency",
    ],
  ],
  ["EQ", ["Self-awareness", "Empathy", "Regulation", "Motivation", "Relational depth"]],
  ["SQ", ["Collaboration", "Communication", "Citizenship", "Contextual judgment", "Influence"]],
  [
    "AQ",
    ["Resilience", "Learning agility", "Ambiguity tolerance", "Adaptive response", "Recovery"],
  ],
] as const;

function Framework() {
  return (
    <AppShell eyebrow="FRAMEWORK · METHODOLOGY" title="The Quadrant Intelligence framework.">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 border border-border p-10">
          <div className="label-eyebrow-gold mb-6">FOUNDATION</div>
          <p className="text-[18px] leading-[1.7] text-foreground max-w-2xl">
            QiDS treats human capability as four interconnected intelligences. Each intelligence is
            structured into measurable parameters, banded against developmental thresholds, and
            connected to deliberate practice. The system is designed to remain coherent across
            contexts — from a primary-school child to a senior executive.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {PRINCIPLES.map(([n, t, d]) => (
              <div key={n} className="bg-background p-8">
                <div className="font-display text-[22px] text-[var(--gold)] mb-3">{n}</div>
                <div className="text-[15px] mb-2">{t}</div>
                <div className="text-[13px] text-muted-foreground leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 border border-border p-8">
          <div className="label-eyebrow mb-5">REFERENCES</div>
          <ul className="space-y-4 text-[13px]">
            {[
              ["Cycle structure", "12 weeks · 3 phases"],
              ["Bands", "Red · Yellow · Green"],
              ["Quotients", "IQ · EQ · SQ · AQ"],
              ["Parameters", "20 core · 12 extension"],
              ["Modes", "6 operating contexts"],
              ["Age range", "8 to 60+"],
            ].map(([k, v]) => (
              <li
                key={k}
                className="flex items-baseline justify-between border-b border-border pb-3"
              >
                <span className="text-muted-foreground">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 border border-border">
          <div className="px-8 py-6 border-b border-border">
            <div className="label-eyebrow mb-2">PARAMETER MAP</div>
            <div className="font-display text-[22px]">Twenty parameters across four quotients</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {PARAMS.map(([q, items]) => (
              <div key={q} className="bg-background p-8">
                <div className="font-display text-[26px] text-[var(--gold)] mb-5">{q}</div>
                <ul className="space-y-3">
                  {items.map((p, i) => (
                    <li
                      key={p}
                      className="flex items-baseline gap-3 text-[13px] border-b border-border pb-2"
                    >
                      <span className="font-mono text-[10px] tracking-wider text-muted-foreground w-6">
                        0{i + 1}
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
