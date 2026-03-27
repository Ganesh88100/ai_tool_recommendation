import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const logMessages = [
  "[SYS] Neural network modules loaded",
  "[DB] Connected to tools database (110+ entries)",
  "[NET] API endpoints initialized",
  "[AI] Recommendation engine online",
  "[SEC] Authentication layer active",
  "[MON] Real-time monitoring started",
  "[LOG] User session initialized",
  "[DB] Cache warmed successfully",
  "[NET] WebSocket connection established",
  "[AI] Model inference ready (avg 12ms)",
];

const TerminalLog = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    logMessages.forEach((msg, i) => {
      setTimeout(() => setLines(prev => [...prev, `${new Date().toLocaleTimeString()} ${msg}`]), (i + 1) * 300);
    });
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="glass-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-secondary/50">
        <Terminal size={12} className="text-primary" />
        <span className="text-[10px] font-mono text-muted-foreground">system_log.sh — AI Hub Analyzer</span>
      </div>
      <div className="p-4 max-h-48 overflow-y-auto">
        <div className="space-y-1">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className={`text-[10px] font-mono ${
                line.includes("[SYS]") ? "text-primary" :
                line.includes("[DB]") ? "text-neon-cyan" :
                line.includes("[NET]") ? "text-accent" :
                line.includes("[AI]") ? "text-neon-purple" :
                line.includes("[SEC]") ? "text-destructive" :
                "text-muted-foreground"
              }`}
            >
              {line}
            </motion.div>
          ))}
          <span className="inline-block w-1.5 h-3 bg-primary terminal-cursor" />
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalLog;
