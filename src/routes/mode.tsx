import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Wordmark } from "@/components/qids/brand";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/mode")({
  head: () => ({
    meta: [
      { title: "Choose your mode — QiDS" },
      {
        name: "description",
        content:
          "Select the operating context for your QiDS assessment: Individual, School, College, Corporate, Interview, or Custom.",
      },
    ],
  }),
  component: ModePage,
});

const MODES = [
  {
    id: "individual",
    name: "Individual",
    desc: "Personal development and self-directed growth across all four quotients.",
    meta: "Self-paced · 45 min",
  },
  {
    id: "school",
    name: "School",
    desc: "K–12 cohorts with age-banded modules and facilitator review.",
    meta: "Ages 8–18 · Cohort",
  },
  {
    id: "college",
    name: "College",
    desc: "Undergraduate and graduate cohorts; career-readiness profiling.",
    meta: "Ages 18–25 · Cohort",
  },
  {
    id: "corporate",
    name: "Corporate",
    desc: "Teams, leaders, and L&D programs with organisational reporting.",
    meta: "Team · Leader · L&D",
  },
  {
    id: "interview",
    name: "Interview",
    desc: "Hiring and selection-grade profiling with structured evidence.",
    meta: "Selection-grade",
  },
  {
    id: "custom",
    name: "Custom",
    desc: "Bespoke configuration for institutions and research programs.",
    meta: "Configured",
  },
];

function ModePage() {
  const [selected, setSelected] = useState(() => localStorage.getItem("qids_mode") || "individual");
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem("qids_mode", selected);
    navigate({ to: "/auth/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="h-20 px-6 lg:px-12 flex items-center justify-between border-b border-border">
        <Wordmark />
        <Link
          to="/"
          className="text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← BACK
        </Link>
      </header>

      <div className="px-6 lg:px-12 py-16 lg:py-24 max-w-6xl mx-auto">
        <div className="label-eyebrow-gold mb-6">STEP 01 — CONTEXT</div>
        <h1 className="font-display text-[40px] lg:text-[56px] leading-[1.05] tracking-tight max-w-2xl">
          Choose the context for this assessment.
        </h1>
        <p className="mt-6 text-muted-foreground max-w-xl leading-relaxed">
          The mode adjusts language, defaults, and modules. The underlying framework — IQ, EQ, SQ,
          AQ — stays constant.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {MODES.map((m) => {
            const isActive = selected === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className={`bg-background text-left p-7 transition-all relative ${
                  isActive
                    ? "ring-1 ring-[var(--gold)] ring-inset bg-[var(--surface)]"
                    : "hover:bg-[var(--surface)]"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <span className="label-eyebrow">{m.meta}</span>
                  <span
                    className={`w-4 h-4 border ${isActive ? "border-[var(--gold)] bg-[var(--gold)]" : "border-[var(--border-strong)]"} flex items-center justify-center`}
                  >
                    {isActive && <Check className="w-3 h-3 text-background" />}
                  </span>
                </div>
                <div className="font-display text-[22px] mb-3">{m.name}</div>
                <div className="text-[13px] text-muted-foreground leading-relaxed">{m.desc}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-10">
          <div className="font-mono text-[11px] tracking-wider text-muted-foreground">
            01 / 03 · CONTEXT SELECTED
          </div>
          <Button variant="gold" size="lg" onClick={handleContinue}>
            Continue to Sign In <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
