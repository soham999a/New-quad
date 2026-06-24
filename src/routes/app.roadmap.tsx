import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";
import { Check } from "lucide-react";

export const Route = createFileRoute("/app/roadmap")({
  head: () => ({ meta: [{ title: "Development Roadmap — QiDS" }] }),
  component: Roadmap,
});

const PHASES = [
  {
    label: "WEEK 1–2 · GROUND",
    status: "complete",
    title: "Baseline & calibration",
    items: ["IQP baseline established", "Mode and context confirmed", "Practice cadence set"],
  },
  {
    label: "WEEK 3–6 · PRACTICE",
    status: "active",
    title: "Contextual judgment in groups",
    items: [
      "Pause-and-frame protocol in three meetings / week",
      "Daily 5-minute reflective entry",
      "Peer-review session every Friday",
    ],
  },
  {
    label: "WEEK 7–9 · INTEGRATE",
    status: "pending",
    title: "Cross-quotient synthesis",
    items: [
      "Lead a cross-functional review",
      "Synthesis micro-module · 4 sessions",
      "Mid-cycle IQP refresh",
    ],
  },
  {
    label: "WEEK 10–12 · EVIDENCE",
    status: "pending",
    title: "Demonstrated practice & re-assessment",
    items: ["Submit evidence log", "Re-assess SQ · IQ", "Generate Cycle 02 report"],
  },
];

function Roadmap() {
  return (
    <AppShell eyebrow="DEVELOPMENT ROADMAP · 12 WEEKS" title="A deliberate path, not a checklist.">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4 border border-border p-8">
          <div className="label-eyebrow mb-4">FOCUS QUOTIENT</div>
          <div className="font-display text-[64px] text-[var(--gold)] leading-none">SQ</div>
          <div className="text-muted-foreground text-[13px] mt-3">Social Intelligence</div>
          <div className="hairline my-6" />
          <div className="space-y-4">
            {[
              ["Current score", "61"],
              ["Target", "75"],
              ["Cycle length", "12 weeks"],
              ["Sessions / week", "3–4"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between text-[13px]">
                <span className="text-muted-foreground">{k}</span>
                <span className="num">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-px bg-border border border-border">
          {PHASES.map((p) => (
            <div key={p.label} className="bg-background p-8">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="label-eyebrow mb-2">{p.label}</div>
                  <div className="font-display text-[22px]">{p.title}</div>
                </div>
                <StatusPill status={p.status} />
              </div>
              <ul className="space-y-2 mt-6">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-[14px]">
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full ${p.status === "complete" ? "bg-[var(--band-green)]" : p.status === "active" ? "bg-[var(--gold)]" : "bg-[var(--border-strong)]"}`}
                    />
                    <span className={p.status === "pending" ? "text-muted-foreground" : ""}>
                      {i}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    complete: { label: "COMPLETE", color: "var(--band-green)" },
    active: { label: "IN PROGRESS", color: "var(--gold)" },
    pending: { label: "PENDING", color: "var(--border-strong)" },
  };
  const s = map[status];
  return (
    <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.18em]">
      {status === "complete" ? (
        <Check className="w-3 h-3" style={{ color: s.color }} />
      ) : (
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
      )}
      <span
        style={{ color: status === "pending" ? "var(--muted-foreground)" : "var(--foreground)" }}
      >
        {s.label}
      </span>
    </div>
  );
}
