import { motion } from "framer-motion";
import { AITool } from "@/data/mockData";
import { Trophy } from "lucide-react";

interface ComparisonTableProps {
  tools: AITool[];
}

const ComparisonTable = ({ tools }: ComparisonTableProps) => {
  if (tools.length < 2) return null;

  const bestRating = Math.max(...tools.map(t => t.rating));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold gradient-text mb-4 flex items-center gap-2">
        <Trophy size={18} /> Comparison
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted-foreground border-b border-border">
            <th className="text-left py-3 px-2 font-medium">Tool</th>
            <th className="text-left py-3 px-2 font-medium">Price</th>
            <th className="text-left py-3 px-2 font-medium">Accuracy</th>
            <th className="text-left py-3 px-2 font-medium">Speed</th>
            <th className="text-left py-3 px-2 font-medium">Best For</th>
          </tr>
        </thead>
        <tbody>
          {tools.map(tool => (
            <tr
              key={tool.id}
              className={`border-b border-border/50 transition-colors ${tool.rating === bestRating ? "bg-primary/5" : ""}`}
            >
              <td className="py-3 px-2 font-medium text-foreground">
                {tool.name}
                {tool.rating === bestRating && (
                  <span className="ml-2 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-accent/15 text-accent">BEST</span>
                )}
              </td>
              <td className="py-3 px-2 text-muted-foreground">{tool.price}</td>
              <td className="py-3 px-2 text-accent">{tool.accuracy}</td>
              <td className="py-3 px-2 text-muted-foreground">{tool.speed}</td>
              <td className="py-3 px-2 text-muted-foreground">{tool.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default ComparisonTable;
