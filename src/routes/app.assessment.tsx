import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/app/assessment")({
  head: () => ({ meta: [{ title: "Assessment — QiDS" }] }),
  component: Assessment,
});

const QUESTIONS = [
  {
    section: "SQ · Social Intelligence",
    n: "07 / 18",
    prompt: "When a peer interrupts you mid-thought during a group discussion, your most natural response is to:",
    options: [
      "Pause, let them finish, then return to your point precisely.",
      "Defer entirely and adopt their direction.",
      "Restate your point more forcefully to reclaim the floor.",
      "Withdraw and observe the rest of the conversation.",
    ],
  },
];

function Assessment() {
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate();
  const q = QUESTIONS[0];

  return (
    <AppShell
      eyebrow="ASSESSMENT ENGINE · CYCLE 02"
      title="One decision per screen."
      action={
        <Link to="/app" className="text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground">
          SAVE & EXIT
        </Link>
      }
    >
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-muted-foreground mb-3">
            <span>{q.section}</span>
            <span>{q.n}</span>
          </div>
          <div className="h-px bg-border w-full" />
          <div className="h-px bg-[var(--gold)] w-[38%] -mt-px" />
        </div>

        <div className="label-eyebrow-gold mb-6">SCENARIO 07</div>
        <h2 className="font-display text-[28px] lg:text-[34px] leading-[1.25] tracking-tight mb-12">
          {q.prompt}
        </h2>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const active = selected === i;
            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left p-6 border transition-all flex items-start gap-5 ${
                  active
                    ? "border-[var(--gold)] bg-[var(--surface)]"
                    : "border-border hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
                }`}
              >
                <span
                  className={`font-mono text-[11px] tracking-wider pt-1 ${
                    active ? "text-[var(--gold)]" : "text-muted-foreground"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-[15px] leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border pt-8">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
          <Button
            variant="gold"
            disabled={selected === null}
            onClick={() => navigate({ to: "/app/iqp" })}
          >
            Continue <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
