import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview — QiDS" }] }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <AppShell
      eyebrow="OVERVIEW · INDIVIDUAL"
      title="Good morning, Aarav."
      action={
        <Button asChild variant="gold">
          <Link to="/app/assessment">Continue Assessment <ArrowRight className="w-4 h-4" /></Link>
        </Button>
      }
    >
      <div className="grid grid-cols-12 gap-6">
        {/* Status */}
        <div className="col-span-12 lg:col-span-8 border border-border p-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="label-eyebrow mb-3">CYCLE 02 · IN PROGRESS</div>
              <div className="font-display text-[26px] leading-tight">Assessment 02 of 04</div>
              <div className="text-muted-foreground text-[13px] mt-1">Social Intelligence — Section C</div>
            </div>
            <div className="num text-[42px] text-[var(--gold)]">62%</div>
          </div>
          <div className="h-px bg-border w-full mb-1" />
          <div className="h-px bg-[var(--gold)] w-[62%] -mt-px" />
          <div className="mt-8 grid grid-cols-4 gap-px bg-border border border-border">
            {[
              ["IQ", "Complete", "74"],
              ["EQ", "Complete", "68"],
              ["SQ", "In progress", "—"],
              ["AQ", "Pending", "—"],
            ].map(([k, s, v]) => (
              <div key={k} className="bg-background p-5">
                <div className="label-eyebrow mb-2">{s}</div>
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[22px]">{k}</span>
                  <span className="num text-[20px] text-muted-foreground">{v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next action */}
        <div className="col-span-12 lg:col-span-4 border border-border p-8 flex flex-col">
          <div className="label-eyebrow-gold mb-4">NEXT BEST ACTION</div>
          <div className="font-display text-[22px] leading-tight">
            Complete the Social Intelligence section to unlock your interim IQP.
          </div>
          <div className="text-muted-foreground text-[13px] mt-3">
            18 items · estimated 12 minutes
          </div>
          <div className="flex-1" />
          <Button asChild variant="gold" className="mt-8 w-full justify-between">
            <Link to="/app/assessment">Resume <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        {/* Modules */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {[
            { to: "/app/iqp", title: "IQP Report", desc: "Your current Individual Quotient Profile and banding.", meta: "INTERIM" },
            { to: "/app/roadmap", title: "Development Roadmap", desc: "Personalised practice across the next 90 days.", meta: "12 ACTIONS" },
            { to: "/app/framework", title: "Framework", desc: "Methodology, parameters, and evidence model.", meta: "REFERENCE" },
          ].map((m) => (
            <Link key={m.to} to={m.to} className="bg-background p-8 group transition-colors hover:bg-[var(--surface)]">
              <div className="flex items-center justify-between mb-6">
                <span className="label-eyebrow">{m.meta}</span>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[var(--gold)] transition" />
              </div>
              <div className="font-display text-[20px] mb-2">{m.title}</div>
              <div className="text-[13px] text-muted-foreground leading-relaxed">{m.desc}</div>
            </Link>
          ))}
        </div>

        {/* Activity */}
        <div className="col-span-12 border border-border">
          <div className="px-8 py-6 border-b border-border flex items-center justify-between">
            <div>
              <div className="label-eyebrow mb-2">EVIDENCE TIMELINE</div>
              <div className="font-display text-[20px]">Recent activity</div>
            </div>
            <Link to="/app/roadmap" className="text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground">
              VIEW ALL →
            </Link>
          </div>
          <ul>
            {[
              ["21 JUN", "EQ section completed", "Banding shifted from Yellow to Green"],
              ["18 JUN", "IQ baseline established", "Score: 74 · Yellow band"],
              ["15 JUN", "Intake completed", "Individual mode · adult cohort"],
              ["14 JUN", "Account created", "Cycle 02 initialised"],
            ].map(([date, title, desc]) => (
              <li key={title} className="grid grid-cols-12 gap-6 px-8 py-5 border-b border-border last:border-b-0">
                <div className="col-span-2 font-mono text-[11px] tracking-wider text-muted-foreground pt-1">{date}</div>
                <div className="col-span-10 md:col-span-7">
                  <div className="text-[14px]">{title}</div>
                  <div className="text-[12px] text-muted-foreground mt-1">{desc}</div>
                </div>
                <div className="hidden md:flex col-span-3 items-center justify-end">
                  <span className="label-eyebrow">LOGGED</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
