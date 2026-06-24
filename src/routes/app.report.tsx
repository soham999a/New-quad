import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { Download, Printer, Loader2 } from "lucide-react";
import { RadarChart } from "@/components/qids/radar-chart";
import { useAuth } from "@/contexts/AuthContext";
import { getLatestAssessment } from "@/services/firestoreService";
import { computeWeightedScore } from "@/data/qidsData";

export const Route = createFileRoute("/app/report")({
  head: () => ({ meta: [{ title: "Report Export — QiDS" }] }),
  component: Report,
});

function Report() {
  const auth = useAuth();
  const user = auth.user;
  const profile = auth.userProfile;
  const [latest, setLatest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const name = user?.displayName || profile?.name || "User";

  useEffect(() => {
    if (user)
      getLatestAssessment(user.uid).then((d) => {
        setLatest(d);
        setLoading(false);
      });
    else setLoading(false);
  }, [user]);

  if (loading)
    return (
      <AppShell title="Export Report" eyebrow="LOADING">
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      </AppShell>
    );
  if (!latest?.scores)
    return (
      <AppShell title="Export Report" eyebrow="NO DATA">
        <div className="text-center py-20 text-muted-foreground">
          Complete an assessment first to export a report.
        </div>
      </AppShell>
    );

  const scores = latest.scores;
  const weighted = latest.weighted || computeWeightedScore(scores);
  const today = new Date()
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .toUpperCase();

  return (
    <AppShell
      eyebrow="REPORT · EXPORT PREVIEW"
      title="Assessment summary."
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
                {name}
              </div>
              <div className="text-muted-foreground text-[13px] mt-2">
                {(latest.mode || "Individual").toUpperCase()} mode · {latest.grade} band
              </div>
            </div>
            <div className="text-right">
              <div className="label-eyebrow">ISSUED</div>
              <div className="font-mono text-[12px] mt-1">{today}</div>
              <div className="label-eyebrow mt-4">WEIGHTED</div>
              <div className="font-mono text-[12px] mt-1">{weighted}</div>
            </div>
          </div>
          <div className="hairline" />
          <div className="grid grid-cols-4 gap-px bg-border border border-border mt-8">
            {["IQ", "EQ", "SQ", "AQ"].map((k) => (
              <div key={k} className="bg-background p-5 text-center">
                <div className="font-display text-[18px] text-[var(--gold)]">{k}</div>
                <div className="num text-[26px] mt-1">{scores[k] || "—"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-2 gap-px bg-border border-b border-border">
          <div className="bg-background p-10">
            <div className="label-eyebrow mb-4">COMPOSITE PROFILE</div>
            <RadarChart
              data={["IQ", "EQ", "SQ", "AQ"].map((k) => ({
                key: k,
                label: k,
                value: scores[k] || 0,
              }))}
              size={320}
            />
          </div>
          <div className="bg-background p-10">
            <div className="label-eyebrow mb-4">SUMMARY</div>
            <p className="text-[14px] leading-[1.7]">
              Assessment completed in {(latest.mode || "individual").toUpperCase()} mode. Weighted
              score: {weighted} ({latest.grade || "—"})
            </p>
            <div className="hairline my-6" />
            <div className="label-eyebrow mb-3">QUOTIENT SCORES</div>
            <ol className="space-y-2 text-[13px] list-decimal pl-5 text-muted-foreground">
              {["IQ", "EQ", "SQ", "AQ"].map((k) => (
                <li key={k}>
                  {k}: {scores[k] || "—"}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="p-10 flex items-center justify-between text-[11px] font-mono tracking-wider text-muted-foreground">
          <span>QiDS · QUADRANT INTELLIGENCE DEVELOPMENT SYSTEM</span>
          <span>PAGE 01 / 01</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 no-print">
        <Link
          to="/app/iqp"
          className="text-[12px] font-mono tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← BACK TO IQP
        </Link>
      </div>
    </AppShell>
  );
}
