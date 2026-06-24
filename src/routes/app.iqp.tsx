import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/qids/app-shell";
import { RadarChart } from "@/components/qids/radar-chart";
import { Button } from "@/components/ui/button";
import { Download, Printer, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getLatestAssessment } from "@/services/firestoreService";
import { computeWeightedScore, getGrade, GRADE_BANDS } from "@/data/qidsData";

const BANDS = {
  green: { name: "Green · Developed", desc: "Consistent expression across contexts." },
  yellow: { name: "Yellow · Emerging", desc: "Capable, with context-dependent variance." },
  red: { name: "Red · Developing", desc: "Targeted practice recommended." },
};

const PILLAR_INFO: Record<string, { label: string; color: string }> = {
  IQ: { label: "Cognitive", color: "var(--iq)" },
  EQ: { label: "Emotional", color: "var(--eq)" },
  SQ: { label: "Social", color: "var(--sq)" },
  AQ: { label: "Adaptive", color: "var(--aq)" },
};

export const Route = createFileRoute("/app/iqp")({
  head: () => ({ meta: [{ title: "IQP — Individual Quotient Profile" }] }),
  component: IQP,
});

function IQP() {
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
      <AppShell title="IQP Report" eyebrow="LOADING">
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      </AppShell>
    );
  if (!latest?.scores)
    return (
      <AppShell title="IQP Report" eyebrow="NO DATA">
        <div className="text-center py-20 text-muted-foreground">
          Complete an assessment first to view your IQP.
        </div>
      </AppShell>
    );

  const scores = latest.scores;
  const weighted = latest.weighted || computeWeightedScore(scores);
  const grade = getGrade(weighted);

  const quotients = Object.entries(PILLAR_INFO).map(([k, v]) => ({
    key: k,
    label: v.label,
    value: scores[k] || 0,
    band: scores[k] >= 75 ? "green" : scores[k] >= 60 ? "yellow" : "red",
    color: v.color,
  }));

  const radarData = quotients.map((q) => ({ key: q.key, label: q.key, value: q.value }));

  const lowest = [...quotients].sort((a, b) => a.value - b.value)[0];
  const recos = [
    [
      "01",
      `${lowest?.key || "IQ"} Focus`,
      `Prioritise development in ${lowest?.label || "Cognitive"} intelligence.`,
    ],
    ["02", "Cross-quotient practice", "Integrate quotient strengths into daily practice."],
    ["03", "Re-assess", "Schedule a follow-up assessment in 12 weeks."],
  ];

  return (
    <AppShell
      eyebrow={`INDIVIDUAL QUOTIENT PROFILE · ${grade.grade} BAND`}
      title={`${name}.`}
      action={
        <div className="flex gap-2 no-print">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="w-4 h-4" /> Print
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link to="/app/report">
              <Download className="w-4 h-4" /> Export Report
            </Link>
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
              <div className="num text-[42px] text-[var(--gold)] leading-none">{weighted}</div>
              <div className="text-[11px] font-mono tracking-wider text-muted-foreground mt-1">
                {grade.grade} · {grade.label}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <RadarChart data={radarData} />
          </div>
        </div>

        {/* Quotient cards */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-px bg-border border border-border">
          {quotients.map((q) => {
            const dot =
              q.band === "green"
                ? "var(--band-green)"
                : q.band === "yellow"
                  ? "var(--band-yellow)"
                  : "var(--band-red)";
            return (
              <div key={q.key} className="bg-background p-6">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-display text-[28px]" style={{ color: q.color }}>
                    {q.key}
                  </span>
                  <span className="num text-[22px]">{q.value}</span>
                </div>
                <div className="text-[12px] text-muted-foreground mb-3">{q.label}</div>
                <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider">
                  <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
                  <span>{q.band.toUpperCase()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative */}
        <div className="col-span-12 lg:col-span-8 border border-border p-10">
          <div className="label-eyebrow-gold mb-4">NARRATIVE SUMMARY</div>
          <h3 className="font-display text-[26px] leading-tight mb-6 max-w-2xl">
            Your profile reflects your current quotient landscape — use it as a starting point for
            growth.
          </h3>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-[14px] text-muted-foreground leading-relaxed">
            {quotients.map((q) => (
              <p key={q.key}>
                {q.key} ({q.value}):{" "}
                {q.value >= 75
                  ? "Developed and consistent."
                  : q.value >= 60
                    ? "Emerging with context-dependent variance."
                    : "Developing — targeted practice recommended."}
              </p>
            ))}
          </div>
        </div>

        {/* Bands legend */}
        <div className="col-span-12 lg:col-span-4 border border-border p-8">
          <div className="label-eyebrow mb-5">GRADE BANDS</div>
          {GRADE_BANDS.map((b) => (
            <div key={b.grade} className="py-4 border-b border-border last:border-b-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: b.color }} />
                <span className="text-[13px]">
                  {b.grade} · {b.label}
                </span>
              </div>
              <div className="text-[12px] text-muted-foreground pl-5">
                {b.min}–{b.max} points
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="col-span-12 border border-border p-10">
          <div className="label-eyebrow-gold mb-4">DEVELOPMENT RECOMMENDATIONS</div>
          <h3 className="font-display text-[26px] leading-tight mb-8">
            Assessment leads to growth, not judgment.
          </h3>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {recos.map(([n, t, d]) => (
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
