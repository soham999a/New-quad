import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import {
  PILLARS,
  WEIGHTS,
  GRADE_BANDS,
  CONTEXTS,
  IQ_QUESTIONS,
  EQ_QUESTIONS,
  SQ_QUESTIONS,
  AQ_QUESTIONS,
  computePillarScore,
  computeWeightedScore,
  getGrade,
  mapAQLikert,
} from "@/data/qidsData";
import { useAuth } from "@/contexts/AuthContext";
import { saveAssessment } from "@/services/firestoreService";

const STEPS = [
  { id: "intake", label: "Intake", title: "Personal Information" },
  { id: "iq", label: "IQ", title: "Cognitive Intelligence Assessment" },
  { id: "eq", label: "EQ", title: "Emotional Intelligence Assessment" },
  { id: "sq", label: "SQ", title: "Social Intelligence Assessment" },
  { id: "aq", label: "AQ", title: "Adversity Intelligence Assessment" },
  { id: "review", label: "Review", title: "Review & Submit" },
];

export const Route = createFileRoute("/app/assessment")({
  component: AssessmentPage,
});

function AssessmentPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const user = auth.user;
  const [step, setStep] = useState(0);
  const [intake, setIntake] = useState({
    name: user?.displayName || "",
    age: "19-32",
    context: localStorage.getItem("qids_mode") || "individual",
  });
  const [iqAnswers, setIqAnswers] = useState<Record<string, any>>({});
  const [eqAnswers, setEqAnswers] = useState<Record<string, any>>({});
  const [sqAnswers, setSqAnswers] = useState<Record<string, any>>({});
  const [aqAnswers, setAqAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const progress = ((step + 1) / STEPS.length) * 100;
  const ageKey = intake.age === "11-18" ? "11-18" : "19-32";

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1);
  };
  const handlePrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  function computeIQScore() {
    let correct = 0;
    let total = 0;
    const sections = IQ_QUESTIONS.verbal.sections.concat(
      IQ_QUESTIONS.quantitative.sections,
      IQ_QUESTIONS.psychometric.sections,
    );
    sections.forEach((sec: any) => {
      if (sec.type === "mcq") {
        sec.questions.forEach((q: any, qi: number) => {
          total++;
          const key = `${sec.title}_${qi}`;
          if (iqAnswers[key] === q.answer) correct++;
        });
      }
    });
    const mcqScore = Math.round((correct / Math.max(total, 1)) * 60);
    const answeredPenalty = Object.values(IQ_QUESTIONS.performance.sections).reduce(
      (s: number, sec: any) => {
        return (
          s +
          (sec.questions || []).filter((q: any, qi: number) =>
            iqAnswers[`${sec.title}_${qi}`]?.trim(),
          ).length *
            3
        );
      },
      0,
    );
    const openScore = Math.min(answeredPenalty, 40);
    return Math.min(mcqScore + openScore, 100);
  }

  function computeEQScoreFromAnswers() {
    const comps = ["SA", "ER", "SM", "E", "IS"];
    let total = 0;
    let count = 0;
    comps.forEach((c) => {
      const qs = EQ_QUESTIONS.partA[c]?.questions[ageKey] || [];
      qs.forEach((_: any, qi: number) => {
        const v = eqAnswers[`${c}_${qi}`];
        if (v) {
          total += v;
          count++;
        }
      });
    });
    return count > 0 ? Math.round((total / (count * 5)) * 100) : 50;
  }

  function computeSQScoreFromAnswers() {
    const csiQuestions = SQ_QUESTIONS.component2_CSI.questions || [];
    let marks = 0;
    csiQuestions.forEach((q: any, qi: number) => {
      const sel = sqAnswers[`csi_${qi}`];
      if (sel !== undefined && q.options[sel]) marks += q.options[sel].marks;
    });
    return Math.round((marks / 6) * 100);
  }

  function computeAQScoreFromAnswers() {
    const comps = ["SA", "PM", "RR", "RC"];
    let raw = 0;
    comps.forEach((c) => {
      const v = aqAnswers[c];
      if (v) raw += mapAQLikert(v);
    });
    return Math.round((raw / 12) * 100);
  }

  function computeScores() {
    return {
      IQ: computeIQScore(),
      EQ: computeEQScoreFromAnswers(),
      SQ: computeSQScoreFromAnswers(),
      AQ: computeAQScoreFromAnswers(),
    };
  }

  const handleSubmit = async () => {
    const pillarScores = computeScores();
    const weighted = computeWeightedScore(pillarScores);
    const grade = getGrade(weighted);
    setSaving(true);
    if (user) {
      await saveAssessment(user.uid, {
        scores: pillarScores,
        weighted,
        grade: grade.grade,
        gradeLabel: grade.label,
        intake,
        answers: { iq: iqAnswers, eq: eqAnswers, sq: sqAnswers, aq: aqAnswers },
        mode: intake.context,
        ageGroup: intake.age,
      });
    }
    setSubmitted(true);
    setSaving(false);
  };

  if (submitted) {
    return (
      <AppShell title="Assessment Complete" eyebrow="STEP VI">
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-16 h-16 rounded-full bg-band-green/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-band-green" />
          </div>
          <h2 className="font-display text-3xl mb-4">Assessment Complete</h2>
          <p className="text-muted-foreground mb-8">Your QiDS profile has been saved.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="gold">
              <Link to="/app/iqp">
                View IQP Report <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/app">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="Assessment" eyebrow="QUOTIENT ASSESSMENT">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono border ${i === step ? "border-gold text-gold bg-gold/10" : i < step ? "border-band-green text-band-green bg-band-green/10" : "border-border text-muted-foreground"}`}
              >
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span
                className={`text-xs font-mono hidden md:inline ${i === step ? "text-foreground" : "text-muted-foreground"}`}
              >
                {s.label}
              </span>
              {i < STEPS.length - 1 && <div className="w-6 h-px bg-border" />}
            </div>
          ))}
        </div>

        <Progress value={progress} className="mb-8 h-1" />

        {step === 0 && (
          <Card className="border-border bg-surface">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Tell us about yourself to contextualize your assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Full Name</label>
                <input
                  value={intake.name}
                  onChange={(e) => setIntake((p) => ({ ...p, name: e.target.value }))}
                  className="w-full h-10 px-3 rounded-sm border border-input bg-background text-foreground"
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Age Group</label>
                <select
                  value={intake.age}
                  onChange={(e) => setIntake((p) => ({ ...p, age: e.target.value }))}
                  className="w-full h-10 px-3 rounded-sm border border-input bg-background text-foreground"
                >
                  <option value="11-18">11–18 years</option>
                  <option value="19-32">19–32 years</option>
                  <option value="33-60">33–60 years</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm">Assessment Context</label>
                <select
                  value={intake.context}
                  onChange={(e) => setIntake((p) => ({ ...p, context: e.target.value }))}
                  className="w-full h-10 px-3 rounded-sm border border-input bg-background text-foreground"
                >
                  {CONTEXTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 1 && <IQSection answers={iqAnswers} setAnswers={setIqAnswers} />}
        {step === 2 && <EQSection answers={eqAnswers} setAnswers={setEqAnswers} ageKey={ageKey} />}
        {step === 3 && <SQSection answers={sqAnswers} setAnswers={setSqAnswers} />}
        {step === 4 && <AQSection answers={aqAnswers} setAnswers={setAqAnswers} />}

        {step === 5 && (
          <Card className="border-border bg-surface">
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Please review your information before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-border rounded-sm p-3">
                  <div className="text-xs text-muted-foreground">Name</div>
                  <div className="text-sm">{intake.name || "Not provided"}</div>
                </div>
                <div className="border border-border rounded-sm p-3">
                  <div className="text-xs text-muted-foreground">Context</div>
                  <div className="text-sm">
                    {CONTEXTS.find((c) => c.id === intake.context)?.label}
                  </div>
                </div>
                <div className="border border-border rounded-sm p-3">
                  <div className="text-xs text-muted-foreground">Age Group</div>
                  <div className="text-sm">{intake.age}</div>
                </div>
              </div>
              <div className="border border-border rounded-sm p-4">
                <div className="text-xs text-muted-foreground mb-2">Assessment Summary</div>
                <div className="grid grid-cols-4 gap-3 text-center text-sm">
                  <div>
                    <div className="text-gold font-mono">IQ</div>
                    <div className="text-muted-foreground">
                      {Object.keys(iqAnswers).length} answered
                    </div>
                  </div>
                  <div>
                    <div className="text-gold font-mono">EQ</div>
                    <div className="text-muted-foreground">
                      {Object.keys(eqAnswers).length} answered
                    </div>
                  </div>
                  <div>
                    <div className="text-gold font-mono">SQ</div>
                    <div className="text-muted-foreground">
                      {Object.keys(sqAnswers).length} answered
                    </div>
                  </div>
                  <div>
                    <div className="text-gold font-mono">AQ</div>
                    <div className="text-muted-foreground">
                      {Object.keys(aqAnswers).length} answered
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} variant="gold" className="w-full" disabled={saving}>
                {saving ? "Saving..." : "Submit Assessment"}
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="flex justify-between mt-8">
          <Button onClick={handlePrev} disabled={step === 0} variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" /> Previous
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={handleNext} variant="gold" className="gap-2">
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          ) : null}
        </div>
      </div>
    </AppShell>
  );
}

function IQSection({ answers, setAnswers }: { answers: Record<string, any>; setAnswers: any }) {
  const iqKeys = Object.keys(IQ_QUESTIONS) as (keyof typeof IQ_QUESTIONS)[];
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        This section assesses your cognitive abilities across verbal, quantitative, psychometric,
        and performance dimensions.
      </p>
      {iqKeys.map((sectionKey) => {
        const section = IQ_QUESTIONS[sectionKey] as any;
        return (
          <Card key={sectionKey} className="border-border bg-surface">
            <CardHeader>
              <CardTitle className="text-lg">
                {section.label}{" "}
                <span className="text-xs text-muted-foreground font-mono">
                  (max {section.maxScore})
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {section.sections.map((sec: any) => (
                <div key={sec.title}>
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">
                    {sec.title}
                  </h4>
                  <div className="space-y-4">
                    {sec.questions.map((q: any, qi: number) => {
                      const key = `${sec.title}_${qi}`;
                      return (
                        <div key={qi}>
                          <p className="text-sm mb-2">{q.q}</p>
                          {sec.type === "mcq" && q.options ? (
                            <div className="flex flex-wrap gap-2">
                              {q.options.map((opt: string, oi: number) => (
                                <button
                                  key={oi}
                                  onClick={() => setAnswers((a: any) => ({ ...a, [key]: oi }))}
                                  className={`px-3 py-1.5 border text-sm rounded-sm ${answers[key] === oi ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-foreground"}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          ) : (
                            <input
                              value={answers[key] || ""}
                              onChange={(e) =>
                                setAnswers((a: any) => ({ ...a, [key]: e.target.value }))
                              }
                              className="w-full h-10 px-3 rounded-sm border border-input bg-background text-foreground text-sm"
                              placeholder="Type your answer..."
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

const EQ_COMP_MAP: Record<string, { label: string }> = {
  SA: { label: "Self-Awareness" },
  ER: { label: "Emotion Regulation" },
  SM: { label: "Self-Motivation" },
  E: { label: "Empathy" },
  IS: { label: "Interpersonal Skills" },
};

function EQSection({
  answers,
  setAnswers,
  ageKey,
}: {
  answers: Record<string, any>;
  setAnswers: any;
  ageKey: string;
}) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        Rate each statement from 1 (Never) to 5 (Always) based on your typical behaviour.
      </p>
      {Object.entries(EQ_COMP_MAP).map(([code, comp]) => {
        const qs =
          EQ_QUESTIONS.partA[code]?.questions[ageKey] ||
          EQ_QUESTIONS.partA[code]?.questions["19-32"] ||
          [];
        return (
          <Card key={code} className="border-border bg-surface">
            <CardHeader>
              <CardTitle className="text-lg">{comp.label}</CardTitle>
              <CardDescription className="text-xs">
                {EQ_QUESTIONS.partA[code]?.subParams}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {qs.map((q: string, qi: number) => (
                <div key={qi}>
                  <p className="text-sm mb-2">{q}</p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <button
                        key={r}
                        onClick={() => setAnswers((a: any) => ({ ...a, [`${code}_${qi}`]: r }))}
                        className={`w-9 h-9 text-xs border rounded-sm ${answers[`${code}_${qi}`] === r ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-foreground"}`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function SQSection({ answers, setAnswers }: { answers: Record<string, any>; setAnswers: any }) {
  const csiQuestions = SQ_QUESTIONS.component2_CSI.questions || [];
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        Social scenarios to assess your social intelligence. Choose the most appropriate response.
      </p>
      {csiQuestions.map((q: any, qi: number) => (
        <Card key={qi} className="border-border bg-surface">
          <CardHeader>
            <CardTitle className="text-lg">Scenario {qi + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-4">{q.scenario}</p>
            <div className="space-y-2">
              {q.options.map((opt: any, oi: number) => (
                <label
                  key={oi}
                  className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition-colors ${answers[`csi_${qi}`] === oi ? "border-gold bg-gold/5" : "border-border hover:border-foreground"}`}
                >
                  <input
                    type="radio"
                    name={`csi_${qi}`}
                    checked={answers[`csi_${qi}`] === oi}
                    onChange={() => setAnswers((a: any) => ({ ...a, [`csi_${qi}`]: oi }))}
                    className="accent-gold"
                  />
                  <span className="text-sm">{opt.text}</span>
                </label>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const AQ_COMP_MAP: Record<string, { label: string; desc: string }> = {
  SA: {
    label: "Situational Agility",
    desc: "Adaptive Problem-Solving • Cognitive Flexibility • Emotional Anchoring",
  },
  PM: {
    label: "Proactive Momentum",
    desc: "Anticipatory Readiness • Initiative Amplifier • Momentum Sustainment",
  },
  RR: {
    label: "Relational Resilience",
    desc: "Collective Synergy • Boundary Navigation • Empathic Advocacy",
  },
  RC: {
    label: "Regenerative Capacity",
    desc: "Energy Restoration • Growth Integration • Future-Proofing",
  },
};

function AQSection({ answers, setAnswers }: { answers: Record<string, any>; setAnswers: any }) {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">
        Rate your response to adversity scenarios from 1 (Not at all) to 5 (Completely).
      </p>
      {Object.entries(AQ_COMP_MAP).map(([code, comp]) => (
        <Card key={code} className="border-border bg-surface">
          <CardHeader>
            <CardTitle className="text-lg">{comp.label}</CardTitle>
            <CardDescription className="text-xs">{comp.desc}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              How well does this describe your typical response to challenges?
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((r) => {
                const labels = ["", "Not at all", "Rarely", "Sometimes", "Often", "Always"];
                return (
                  <button
                    key={r}
                    onClick={() => setAnswers((a: any) => ({ ...a, [code]: r }))}
                    className={`flex-1 h-12 text-xs border rounded-sm flex flex-col items-center justify-center gap-0.5 ${answers[code] === r ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-foreground"}`}
                  >
                    <span>{r}</span>
                    <span className="text-[9px] opacity-60">{labels[r]}</span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
