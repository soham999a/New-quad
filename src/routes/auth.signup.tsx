import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wordmark } from "@/components/qids/brand";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/auth/signup")({
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("individual");
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const mode = localStorage.getItem("qids_mode") || "individual";
      await auth.signup(email, password, name, role, mode);
      navigate({ to: "/app/assessment" });
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  const ROLES = [
    { id: "individual", label: "Individual" },
    { id: "student", label: "Student" },
    { id: "evaluator", label: "Evaluator / Teacher" },
    { id: "admin", label: "Administrator" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-border bg-surface">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Wordmark to="/" subtitle />
          </div>
          <CardTitle className="text-foreground">Create account</CardTitle>
          <CardDescription className="text-muted-foreground">
            Join the QiDS platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-foreground">Full Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-foreground">I am a...</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 px-3 rounded-sm border border-input bg-background text-foreground text-sm"
              >
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="gold" className="w-full">
              Create Account
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-gold hover:underline">
              Sign in
            </Link>
          </p>
          <p className="mt-2 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
