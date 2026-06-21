import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { RadarChart } from "@/components/qids/radar-chart";

export const Route = createFileRoute("/app/report")({
  head: () => ({ meta: [{ title: "Report Export — QiDS" }] }),
  component: Report,
});

function Report() {
  return (
    <AppShell
      eyebrow="REPORT · EXPORT PREVIEW"
      title="Cycle 02 — Interim summary."
      action={
        <div className="flex gap-2 no-print">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button variant="gold" size="sm">
            <Download className="w-4 h-4" /> Download PDF
          </Button>
        </div>
      }
    >
      <div className="max-w-4xl mx-auto bg-background border border-border print:border-0">
        {/* Cover */}
        <div className="p-10 lg:p-16 border-b border-border">
          <div className="flex items-start justify-between mb-12">
            <div>
              <div className="label-eyebrow-gold mb-3">QiDS · INDIVIDUAL QUOTIENT PROFILE</div>
              <div className="font-display text-[36px] lg:text-[44px] leading-tight max-w-md">
                Aarav Kumar
              </div>
              <div className="text-muted-foreground text-[13px] mt-2">
                Cycle 02 · Individual mode · Interim
              </div>
            </div>
            <div className="text-right">
              <div className="label-eyebrow">ISSUED</div>
              <div className="font-mono text-[12px] mt-1">21 · JUN · 2026</div>
              <div className="label-eyebrow mt-4">REF</div>
              <div className="font-mono text-[12px] mt-1">QID-0247-AK</div>
            </div>
          </div>
          <div className="hairline" />
          <div className="grid grid-cols-4 gap-px bg-border border border-border mt-8">
            {[["IQ","74"],["EQ","82"],["SQ","61"],["AQ","88"]].map(([k,v]) => (
              <div key={k} className="bg-background p-5 text-center">
                <div className="font-display text-[18px] text-[var(--gold)]">{k}</div>
                <div className="num text-[26px] mt-1">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-px bg-border border-b border-border">
          <div className="bg-background p-10">
            <div className="label-eyebrow mb-4">COMPOSITE PROFILE</div>
            <RadarChart data={[
              { key: "IQ", label: "IQ", value: 74 },
              { key: "EQ", label: "EQ", value: 82 },
              { key: "SQ", label: "SQ", value: 61 },
              { key: "AQ", label: "AQ", value: 88 },
            ]} size={320} />
          </div>
          <div className="bg-background p-10">
            <div className="label-eyebrow mb-4">SUMMARY</div>
            <p className="text-[14px] leading-[1.7]">
              A resilient, emotionally attuned profile. Strongest in adaptive and emotional
              quotients. Social intelligence is the priority development area — particularly
              contextual judgment and group communication.
            </p>
            <div className="hairline my-6" />
            <div className="label-eyebrow mb-3">PRIORITY ACTIONS</div>
            <ol className="space-y-2 text-[13px] list-decimal pl-5 text-muted-foreground">
              <li>Contextual judgment practice · 12 weeks</li>
              <li>Group communication facilitation · weekly</li>
              <li>Synthesis micro-module · 4 sessions</li>
            </ol>
          </div>
        </div>

        <div className="p-10 flex items-center justify-between text-[11px] font-mono tracking-wider text-muted-foreground">
          <span>QiDS · QUADRANT INTELLIGENCE DEVELOPMENT SYSTEM</span>
          <span>PAGE 01 / 12</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 no-print">
        <Link to="/app/iqp" className="text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground">
          ← BACK TO IQP
        </Link>
      </div>
    </AppShell>
  );
}
