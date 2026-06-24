import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/qids/app-shell";
import { RadarChart } from "@/components/qids/radar-chart";
import { User, Award, ArrowRight, Mail, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getLatestAssessment,
  getStudentEvaluator,
  getUserProfile,
} from "@/services/firestoreService";

export const Route = createFileRoute("/app/my-evaluator")({
  component: MyEvaluatorPage,
});

const PILLAR_LABELS: Record<string, string> = {
  IQ: "Cognitive Intelligence",
  EQ: "Emotional Intelligence",
  SQ: "Social Intelligence",
  AQ: "Adaptive Intelligence",
};
const PILLAR_COLORS: Record<string, string> = {
  IQ: "var(--iq)",
  EQ: "var(--eq)",
  SQ: "var(--sq)",
  AQ: "var(--aq)",
};

function MyEvaluatorPage() {
  const auth = useAuth();
  const user = auth.user;
  const [evalData, setEvalData] = useState<any>(null);
  const [evaluator, setEvaluator] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    Promise.all([getLatestAssessment(user.uid), getStudentEvaluator(user.uid)]).then(
      ([assessment, evalAssign]) => {
        setEvalData(assessment);
        if (evalAssign?.evaluatorUid) {
          getUserProfile(evalAssign.evaluatorUid).then((prof) => setEvaluator(prof));
        }
        setLoading(false);
      },
    );
  }, [user]);

  if (loading)
    return (
      <AppShell title="My Evaluator" eyebrow="STUDENT VIEW">
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      </AppShell>
    );

  const scores = evalData?.scores || {};
  const radarData = ["IQ", "EQ", "SQ", "AQ"].map((k) => ({
    key: k.toLowerCase(),
    label: k,
    value: scores[k] || 50,
  }));
  const pillars = ["IQ", "EQ", "SQ", "AQ"].map((k) => ({
    pillar: k,
    label: PILLAR_LABELS[k],
    status: scores[k] ? "Evaluated" : "Pending",
    score: scores[k] || null,
    color: PILLAR_COLORS[k],
  }));
  const completedCount = pillars.filter((p) => p.status === "Evaluated").length;

  return (
    <AppShell title="My Evaluator" eyebrow="STUDENT VIEW">
      <div className="grid grid-cols-12 gap-6">
        {/* Evaluator card */}
        <div className="col-span-12 lg:col-span-4 border border-border">
          <div className="px-6 py-5 border-b border-border">
            <div className="label-eyebrow mb-1">YOUR EVALUATOR</div>
            <div className="font-display text-[18px]">Assigned mentor</div>
          </div>
          <div className="p-6">
            {evaluator ? (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                    <User className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <div className="text-[16px]">{evaluator.name || "Evaluator"}</div>
                    <div className="text-[11px] text-muted-foreground font-mono tracking-wider">
                      EVALUATOR
                    </div>
                  </div>
                </div>
                <div className="space-y-3 text-[13px]">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3.5 h-3.5" /> {evaluator.email || "—"}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No evaluator assigned yet.
              </div>
            )}
          </div>
        </div>

        {/* Evaluation status */}
        <div className="col-span-12 lg:col-span-5 border border-border">
          <div className="px-6 py-5 border-b border-border">
            <div className="label-eyebrow mb-1">ASSESSMENT STATUS</div>
            <div className="font-display text-[18px]">{completedCount}/4 pillars evaluated</div>
          </div>
          <div className="divide-y divide-border">
            {pillars.map((e, i) => (
              <div key={i} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono"
                    style={{ background: `${e.color}15`, color: e.color }}
                  >
                    {e.pillar}
                  </div>
                  <div>
                    <div className="text-[13px]">{e.label}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {e.score ? (
                    <span className="num text-[18px]">{e.score}</span>
                  ) : (
                    <span className="text-[11px] font-mono text-muted-foreground">—</span>
                  )}
                  <span
                    className={`text-[10px] font-mono tracking-wider px-2 py-1 rounded-sm ${e.status === "Evaluated" ? "bg-band-green/20 text-band-green" : "bg-band-yellow/20 text-band-yellow"}`}
                  >
                    {e.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Radar profile */}
        <div className="col-span-12 lg:col-span-3 border border-border">
          <div className="px-6 py-5 border-b border-border flex items-center gap-2">
            <Award className="w-4 h-4 text-gold" />
            <div>
              <div className="label-eyebrow mb-1">PROFILE</div>
              <div className="font-display text-[18px]">Quotient radar</div>
            </div>
          </div>
          <div className="p-6 flex justify-center">
            <RadarChart data={radarData} size={240} />
          </div>
          <div className="px-6 pb-6 text-center">
            <Link
              to="/app/iqp"
              className="text-[11px] font-mono tracking-wider text-gold hover:text-gold/80 flex items-center justify-center gap-1"
            >
              View full IQP report <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
