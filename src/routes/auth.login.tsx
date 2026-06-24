import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wordmark } from "@/components/qids/brand";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/auth/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await auth.login(email, password);
      navigate({ to: "/app/assessment" });
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const mode = localStorage.getItem("qids_mode") || "individual";
      await auth.loginWithGoogle(mode, mode);
      navigate({ to: "/app/assessment" });
    } catch (err: any) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError(err.message || "Google login failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md border-border bg-surface">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Wordmark to="/" subtitle />
          </div>
          <CardTitle className="text-foreground">Sign in</CardTitle>
          <CardDescription className="text-muted-foreground">
            Access your QiDS platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" variant="gold" className="w-full">
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2 px-4 border border-border rounded-sm text-sm text-foreground hover:bg-surface-2 transition"
            >
              Continue with Google
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="text-gold hover:underline">
              Sign up
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
