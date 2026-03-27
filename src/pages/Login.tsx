import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, User, Terminal, Shield } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const lines = [
      "> Initializing AI Hub Analyzer v3.7.2...",
      "> Loading neural network modules...",
      "> Connecting to secure authentication server...",
      "> System ready. Awaiting credentials.",
    ];
    lines.forEach((line, i) => {
      setTimeout(() => setTerminalLines(prev => [...prev, line]), (i + 1) * 400);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTerminalLines(prev => [...prev, `> Authenticating user: ${username}...`]);
    await new Promise(r => setTimeout(r, 1000));
    const success = login(username, password);
    setLoading(false);
    if (success) {
      setTerminalLines(prev => [...prev, "> ACCESS GRANTED. Redirecting..."]);
      setTimeout(() => navigate("/"), 600);
    } else {
      setTerminalLines(prev => [...prev, "> ERROR: Invalid credentials. Access denied."]);
      setError("Invalid credentials. Try admin / 1234");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4 scanlines">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-neon-blue/6 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Terminal panel */}
        <div className="glass-card mb-4 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-accent/40" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-[10px] text-muted-foreground ml-2 font-mono">system_auth.sh</span>
          </div>
          <div className="p-4 font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.includes("ERROR") ? "text-destructive" : line.includes("GRANTED") ? "text-primary neon-text" : "text-muted-foreground"}
              >
                {line}
              </motion.div>
            ))}
            <span className="inline-block w-2 h-4 bg-primary terminal-cursor" />
          </div>
        </div>

        {/* Login card */}
        <div className="glass-card p-8 gradient-border">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center neon-glow">
              <Shield className="w-7 h-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-display font-bold text-center mb-1 gradient-text glitch-text">
            AI HUB ANALYZER
          </h1>
          <p className="text-center text-muted-foreground text-xs mb-8 font-mono">
            [ SECURE AUTHENTICATION REQUIRED ]
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-sm transition-all"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary/50 border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-sm transition-all"
              />
            </div>

            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-destructive text-xs text-center font-mono">
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary/10 border border-primary/40 text-primary font-mono font-semibold text-sm transition-all hover:bg-primary/20 hover:shadow-neon disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  AUTHENTICATING...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Terminal size={14} /> INITIALIZE SESSION
                </span>
              )}
            </button>
          </form>

          <p className="text-muted-foreground text-[10px] text-center mt-6 font-mono">
            credentials: <span className="text-primary">admin</span> / <span className="text-primary">1234</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
