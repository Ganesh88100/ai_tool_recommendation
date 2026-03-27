import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ChevronDown, ChevronUp, Award } from "lucide-react";
import { AITool, Review } from "@/data/mockData";
import StarRating from "./StarRating";

interface ToolCardProps {
  tool: AITool;
  onLike: (id: string) => void;
  isCompareSelected: boolean;
  onCompareToggle: (id: string) => void;
}

const ToolCard = ({ tool, onLike, isCompareSelected, onCompareToggle }: ToolCardProps) => {
  const [showReviews, setShowReviews] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [localReviews, setLocalReviews] = useState<Review[]>(tool.reviews);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(tool.likes);
  const [pulseKey, setPulseKey] = useState(0);

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(c => c + 1);
      setPulseKey(k => k + 1);
      onLike(tool.id);
    }
  };

  const addReview = () => {
    if (!newComment.trim() || newRating === 0) return;
    setLocalReviews(prev => [...prev, { id: Date.now().toString(), rating: newRating, comment: newComment, author: "You", date: new Date().toISOString().split("T")[0] }]);
    setNewComment("");
    setNewRating(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-5 flex flex-col"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">{tool.name}</h3>
            {tool.recommended && (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20">
                <Award size={10} /> TOP
              </span>
            )}
          </div>
          <StarRating rating={Math.round(tool.rating)} size={14} />
        </div>
        <label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isCompareSelected}
            onChange={() => onCompareToggle(tool.id)}
            className="accent-primary w-3.5 h-3.5"
          />
          Compare
        </label>
      </div>

      <p className="text-sm text-muted-foreground mb-4 flex-1">{tool.description}</p>

      <div className="flex items-center justify-between">
        <motion.button
          key={pulseKey}
          animate={pulseKey > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-all ${liked ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
        >
          <ThumbsUp size={14} className={liked ? "fill-primary" : ""} />
          {likeCount}
        </motion.button>

        <button
          onClick={() => setShowReviews(!showReviews)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Reviews ({localReviews.length})
          {showReviews ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      <AnimatePresence>
        {showReviews && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              {localReviews.map(r => (
                <div key={r.id} className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-foreground">{r.author}</span>
                    <StarRating rating={r.rating} size={12} />
                  </div>
                  <p className="text-xs text-muted-foreground">{r.comment}</p>
                </div>
              ))}
              <div className="space-y-2">
                <StarRating rating={newRating} size={16} interactive onChange={setNewRating} />
                <div className="flex gap-2">
                  <input
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Write a review..."
                    className="flex-1 text-sm px-3 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                  <button
                    onClick={addReview}
                    className="px-3 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-neon-sm transition-all"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ToolCard;
