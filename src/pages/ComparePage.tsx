import { useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft } from "lucide-react";
import { getAllTools, AITool } from "@/data/mockData";
import StarRating from "@/components/StarRating";

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const ids = (searchParams.get("ids") || "").split(",").filter(Boolean);

  const tools = useMemo(() => {
    const all = getAllTools();
    return ids.map(id => all.find(t => t.id === id)).filter(Boolean) as AITool[];
  }, [ids]);

  if (tools.length < 2) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center font-mono">
          <p className="text-muted-foreground text-sm mb-2">Select at least 2 tools to compare.</p>
          <button onClick={() => navigate("/tools")} className="text-primary text-xs hacker-link">{"<"} Go to tools</button>
        </div>
      </div>
    );
  }

  const bestRating = Math.max(...tools.map(t => t.rating));
  const bestLikes = Math.max(...tools.map(t => t.likes));

  const fields: { key: keyof AITool; label: string; highlight?: (t: AITool) => boolean }[] = [
    { key: "rating", label: "RATING", highlight: t => t.rating === bestRating },
    { key: "price", label: "PRICE" },
    { key: "accuracy", label: "ACCURACY" },
    { key: "speed", label: "SPEED" },
    { key: "bestFor", label: "BEST_FOR" },
    { key: "likes", label: "LIKES", highlight: t => t.likes === bestLikes },
    { key: "category", label: "CATEGORY" },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={14} /> BACK
      </button>

      <div className="flex items-center gap-2">
        <Trophy size={18} className="text-primary" />
        <h1 className="text-xl font-display font-bold gradient-text">COMPARISON MATRIX</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-x-auto">
        <table className="w-full text-xs font-mono">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-muted-foreground font-normal">METRIC</th>
              {tools.map(t => (
                <th key={t.id} className={`text-left py-3 px-4 font-medium ${t.rating === bestRating ? "text-primary" : "text-foreground"}`}>
                  {t.name}
                  {t.rating === bestRating && <span className="ml-1 text-[9px] px-1 py-0.5 rounded bg-primary/15 text-primary">BEST</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fields.map(field => (
              <tr key={field.key} className="border-b border-border/30 hover:bg-secondary/30 transition-colors">
                <td className="py-3 px-4 text-muted-foreground">{field.label}</td>
                {tools.map(t => {
                  const val = t[field.key];
                  const isHighlighted = field.highlight?.(t);
                  return (
                    <td key={t.id} className={`py-3 px-4 ${isHighlighted ? "text-primary font-semibold" : "text-foreground"}`}>
                    {field.key === "rating" ? (
                        <div className="flex items-center gap-1.5">
                          <StarRating rating={Math.round(Number(val))} size={10} />
                          <span>{String(val)}</span>
                        </div>
                      ) : String(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default ComparePage;
