import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Search } from "lucide-react";
import { getAllTools, Review, AITool } from "@/data/mockData";
import StarRating from "@/components/StarRating";
import { useNavigate } from "react-router-dom";

const ReviewsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const allTools = getAllTools();

  const toolsWithReviews = useMemo(() => {
    return allTools.filter(t => t.reviews.length > 0 && (!filter || t.name.toLowerCase().includes(filter.toLowerCase())));
  }, [filter]);

  const totalReviews = toolsWithReviews.reduce((sum, t) => sum + t.reviews.length, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold gradient-text flex items-center gap-2">
            <MessageSquare size={20} /> REVIEW_DATABASE
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">{">"} {totalReviews} reviews across {toolsWithReviews.length} tools</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/60" />
          <input
            value={filter}
            onChange={e => setFilter(e.target.value)}
            placeholder="Filter by tool..."
            className="pl-9 pr-4 py-2 rounded-md bg-card/60 border border-border text-foreground font-mono text-xs placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all w-64"
          />
        </div>
      </div>

      {toolsWithReviews.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground font-mono text-sm">No reviews found. Visit a tool page to add one.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {toolsWithReviews.map(tool => (
            <motion.div key={tool.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5">
              <button onClick={() => navigate(`/tool/${tool.id}`)} className="text-sm font-mono font-semibold text-foreground hacker-link mb-3 block">{tool.name}</button>
              <div className="space-y-2">
                {tool.reviews.map(r => (
                  <div key={r.id} className="bg-secondary/50 rounded-md p-3 border border-border/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono font-medium text-foreground">{r.author}</span>
                      <StarRating rating={r.rating} size={10} />
                    </div>
                    <p className="text-[11px] text-muted-foreground font-mono">{r.comment}</p>
                    <p className="text-[9px] text-muted-foreground/60 font-mono mt-1">{r.date}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
