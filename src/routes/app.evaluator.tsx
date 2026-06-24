import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { Users, ClipboardList, BarChart3, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllUsers } from "@/services/firestoreService";

export const Route = createFileRoute("/app/evaluator")({
  component: EvaluatorPage,
});

function EvaluatorPage() {
  const auth = useAuth();
  const user = auth.user;
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const students = users.filter((u: any) => u.role === "student" || u.role === "individual");
  const pendingCount = students.filter((s: any) => !s._hasAssessment).length;
  const completedCount = students.filter((s: any) => s._hasAssessment).length;

  if (loading)
    return (
      <AppShell title="Evaluator Dashboard" eyebrow="EVALUATOR">
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      </AppShell>
    );

  return (
    <AppShell title="Evaluator Dashboard" eyebrow="EVALUATOR">
      <div className="grid grid-cols-12 gap-6">
        {/* Stats */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {[
            {
              label: "Total Students",
              value: String(students.length),
              icon: Users,
              meta: "On platform",
            },
            {
              label: "Pending",
              value: String(pendingCount),
              icon: ClipboardList,
              meta: "Awaiting assessment",
            },
            {
              label: "Completed",
              value: String(completedCount),
              icon: BarChart3,
              meta: `${completedCount ? Math.round((completedCount / students.length) * 100) : 0}% completion`,
            },
            {
              label: "Evaluators",
              value: String(users.filter((u: any) => u.role === "evaluator").length),
              icon: Users,
              meta: "Active faculty",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-background p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Icon className="w-5 h-5 text-gold" />
                  <span className="label-eyebrow">{s.label}</span>
                </div>
                <div className="num text-[32px] text-foreground">{s.value}</div>
                <div className="text-[11px] font-mono tracking-wider text-muted-foreground mt-1">
                  {s.meta}
                </div>
              </div>
            );
          })}
        </div>

        {/* Student table */}
        <div className="col-span-12 border border-border">
          <div className="px-6 py-5 border-b border-border">
            <div className="label-eyebrow mb-1">ALL STUDENTS</div>
            <div className="font-display text-[18px]">{students.length} enrolled</div>
          </div>
          {students.length === 0 ? (
            <div className="px-6 py-12 text-center text-muted-foreground">
              No students enrolled yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Name</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Email</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Role</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Context</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s: any, i: number) => (
                  <tr
                    key={s.uid || i}
                    className="border-b border-border last:border-b-0 hover:bg-[var(--surface)]/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-[13px]">{s.name || s.email}</span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-muted-foreground">{s.email}</td>
                    <td className="px-6 py-4 text-[12px]">{s.role}</td>
                    <td className="px-6 py-4 text-[12px] text-muted-foreground">
                      {s.context || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-mono tracking-wider px-2 py-1 rounded-sm bg-band-yellow/20 text-band-yellow">
                        PENDING
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AppShell>
  );
}
