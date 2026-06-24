import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/qids/app-shell";
import { Button } from "@/components/ui/button";
import { Users, Shield, BookOpen, Settings, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllUsers } from "@/services/firestoreService";

export const Route = createFileRoute("/app/admin")({
  component: AdminPage,
});

function AdminPage() {
  const auth = useAuth();
  const user = auth.user;
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      setAllUsers(data);
      setLoading(false);
    });
  }, []);

  const students = allUsers.filter((u: any) => u.role === "student" || u.role === "individual");
  const evaluators = allUsers.filter((u: any) => u.role === "evaluator");
  const admins = allUsers.filter((u: any) => u.role === "admin");

  if (loading)
    return (
      <AppShell title="Administration" eyebrow="ADMIN PANEL">
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-gold" />
        </div>
      </AppShell>
    );

  return (
    <AppShell title="Administration" eyebrow="ADMIN PANEL">
      <div className="grid grid-cols-12 gap-6">
        {/* Stats */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {[
            {
              label: "Total Users",
              value: String(allUsers.length),
              icon: Users,
              meta: "Registered",
            },
            {
              label: "Students",
              value: String(students.length),
              icon: BookOpen,
              meta: "Active learners",
            },
            {
              label: "Evaluators",
              value: String(evaluators.length),
              icon: Shield,
              meta: "Faculty",
            },
            {
              label: "Admins",
              value: String(admins.length),
              icon: Settings,
              meta: "Administrators",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-background p-6">
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="num text-[32px] text-foreground">{s.value}</div>
                <div className="text-[11px] font-mono tracking-wider text-muted-foreground mt-1">
                  {s.meta}
                </div>
              </div>
            );
          })}
        </div>

        {/* User Management */}
        <div className="col-span-12 border border-border">
          <div className="px-6 py-5 border-b border-border">
            <div className="label-eyebrow mb-1">USER MANAGEMENT</div>
            <div className="font-display text-[18px]">All platform users</div>
          </div>
          {allUsers.length === 0 ? (
            <div className="px-6 py-12 text-center text-muted-foreground">
              No users registered yet.
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Name</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Email</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Role</th>
                  <th className="px-6 py-4 font-mono text-[10px] tracking-wider">Context</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((u: any, i: number) => (
                  <tr
                    key={u.uid || i}
                    className="border-b border-border last:border-b-0 hover:bg-[var(--surface)]/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-[13px]">{u.name || u.email}</span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-muted-foreground">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-mono tracking-wider px-2 py-1 rounded-sm ${
                          u.role === "admin"
                            ? "bg-gold/10 text-gold"
                            : u.role === "evaluator"
                              ? "bg-band-green/20 text-band-green"
                              : "bg-surface-2 text-muted-foreground"
                        }`}
                      >
                        {(u.role || "individual").toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-muted-foreground">
                      {u.context || "—"}
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
