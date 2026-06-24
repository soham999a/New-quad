import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getLatestAssessment } from "@/services/firestoreService";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Overview — QiDS" }] }),
  component: Dashboard,
});

function Dashboard() {
  const auth = useAuth();
  const user = auth.user;
  const profile = auth.userProfile;
  const [latest, setLatest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const firstName = user?.displayName?.split(" ")[0] || profile?.name?.split(" ")[0] || "User";

  useEffect(() => {
    if (user) {
      getLatestAssessment(user.uid).then((data) => {
        setLatest(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [user]);

  const hasAssessment = latest?.scores;

  return (
    <AppShell
      eyebrow="OVERVIEW · DASHBOARD"
      title={`Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"}, ${firstName}.`}
      action={
        <Button asChild variant="gold">
          <Link to="/app/assessment">
            {hasAssessment ? "New Assessment" : "Begin Assessment"}{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      ) : hasAssessment ? (
        <div className="grid grid-cols-12 gap-6">
          {/* Status */}
          <div className="col-span-12 lg:col-span-8 border border-border p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="label-eyebrow mb-3">
                  {latest.mode?.toUpperCase() || "INDIVIDUAL"} · ASSESSED
                </div>
                <div className="font-display text-[26px] leading-tight">
                  {latest.grade} — {latest.gradeLabel}
                </div>
                <div className="text-muted-foreground text-[13px] mt-1">
                  Weighted score: {latest.weighted}
                </div>
              </div>
              <div className="num text-[42px] text-[var(--gold)]">{latest.weighted}</div>
            </div>
            <div className="h-px bg-border w-full mb-1" />
            <div className="h-px bg-[var(--gold)]" style={{ width: `${latest.weighted}%` }} />
            <div className="mt-8 grid grid-cols-4 gap-px bg-border border border-border">
              {["IQ", "EQ", "SQ", "AQ"].map((k) => (
                <div key={k} className="bg-background p-5">
                  <div className="label-eyebrow mb-2">{latest.scores?.[k] ? "Complete" : "—"}</div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-[22px]">{k}</span>
                    <span className="num text-[20px] text-muted-foreground">
                      {latest.scores?.[k] ?? "—"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next action */}
          <div className="col-span-12 lg:col-span-4 border border-border p-8 flex flex-col">
            <div className="label-eyebrow-gold mb-4">NEXT BEST ACTION</div>
            <div className="font-display text-[22px] leading-tight">
              View your full IQP report or start a new assessment.
            </div>
            <div className="flex-1" />
            <Button asChild variant="gold" className="mt-8 w-full justify-between">
              <Link to="/app/iqp">
                View IQP <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Modules */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                to: "/app/iqp",
                title: "IQP Report",
                desc: "Your Individual Quotient Profile and banding.",
                meta: "LATEST",
              },
              {
                to: "/app/roadmap",
                title: "Development Roadmap",
                desc: "Personalised practice across the next 90 days.",
                meta: "PLAN",
              },
              {
                to: "/app/framework",
                title: "Framework",
                desc: "Methodology, parameters, and evidence model.",
                meta: "REFERENCE",
              },
            ].map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="bg-background p-8 group transition-colors hover:bg-[var(--surface)]"
              >
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
                <div className="label-eyebrow mb-2">ASSESSMENT LOG</div>
                <div className="font-display text-[20px]">Latest results</div>
              </div>
            </div>
            <ul>
              {["IQ", "EQ", "SQ", "AQ"].map((k) => (
                <li
                  key={k}
                  className="grid grid-cols-12 gap-6 px-8 py-5 border-b border-border last:border-b-0"
                >
                  <div className="col-span-2 font-display text-[18px] text-muted-foreground">
                    {k}
                  </div>
                  <div className="col-span-10 md:col-span-7">
                    <div className="text-[14px]">
                      {latest.scores?.[k] ? `Score: ${latest.scores[k]}` : "Not yet assessed"}
                    </div>
                    <div className="text-[12px] text-muted-foreground mt-1">
                      {k === "IQ"
                        ? "Cognitive Intelligence"
                        : k === "EQ"
                          ? "Emotional Intelligence"
                          : k === "SQ"
                            ? "Social Intelligence"
                            : "Adaptive Intelligence"}
                    </div>
                  </div>
                  <div className="hidden md:flex col-span-3 items-center justify-end">
                    <span className="label-eyebrow">
                      {latest.scores?.[k] ? "RECORDED" : "PENDING"}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="num text-[48px] text-[var(--gold)] mb-4">●</div>
          <h2 className="font-display text-[28px] mb-4">No assessment yet</h2>
          <p className="text-muted-foreground max-w-md text-center mb-8">
            Complete your first QiDS assessment to see your profile, scores, and development
            roadmap.
          </p>
          <Button asChild variant="gold" size="lg">
            <Link to="/app/assessment">
              Begin Assessment <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      )}
    </AppShell>
  );
}
