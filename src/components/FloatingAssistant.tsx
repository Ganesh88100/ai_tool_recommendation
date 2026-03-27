import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles, Terminal } from "lucide-react";

const FloatingAssistant = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-card p-5 mb-3 w-72 gradient-border"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-semibold gradient-text flex items-center gap-1.5">
                <Terminal size={12} /> AI_ASSISTANT
              </span>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3 font-mono leading-relaxed">
              {">"} Ready to assist. Search for AI tools by domain or browse the database. Use COMPARE to analyze multiple tools.
            </p>
            <div className="text-[9px] text-muted-foreground/50 font-mono">
              powered by AI Hub Analyzer v3.7
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 shadow-neon flex items-center justify-center text-primary animate-float"
      >
        <MessageCircle size={20} />
      </motion.button>
    </div>
  );
};

export default FloatingAssistant;
