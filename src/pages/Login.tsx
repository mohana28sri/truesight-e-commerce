import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      signup(name, email, password);
      toast({ title: "Account created!", description: "Welcome to TrustCart." });
    } else {
      login(email, password);
      toast({ title: "Welcome back!", description: "You're now signed in." });
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="h-8 w-8 text-accent" />
            <span className="font-display text-2xl font-bold text-foreground">TrustCart</span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">{isSignup ? "Create Account" : "Welcome Back"}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isSignup ? "Join us for authentic products" : "Sign in to your account"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card p-6 sm:p-8 rounded-xl shadow-card space-y-4">
          {isSignup && (
            <div><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} required /></div>
          )}
          <div><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" /></div>
          <div><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" /></div>
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            {isSignup ? "Create Account" : "Sign In"}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button type="button" onClick={() => setIsSignup(!isSignup)} className="text-accent font-medium hover:underline">
              {isSignup ? "Sign In" : "Sign Up"}
            </button>
          </p>
          <p className="text-center text-[10px] text-muted-foreground">
            Tip: Use "admin@example.com" for admin access (mock)
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
