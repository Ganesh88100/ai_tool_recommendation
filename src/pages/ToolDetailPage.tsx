import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ThumbsUp, ExternalLink, Award, Tag, Zap, DollarSign, Target, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { getToolById, Review } from "@/data/mockData";
import StarRating from "@/components/StarRating";

const ToolDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = getToolById(id || "");

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(tool?.likes || 0);
  const [localReviews, setLocalReviews] = useState<Review[]>(tool?.reviews || []);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  if (!tool) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center font-mono">
          <p className="text-destructive text-sm mb-2">ERROR 404: Tool not found</p>
          <button onClick={() => navigate("/tools")} className="text-primary text-xs hacker-link">{"<"} Return to database</button>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLikeCount(c => c + 1);
    }
  };

  const addReview = () => {
    if (!newComment.trim() || newRating === 0) return;
    setLocalReviews(prev => [...prev, {
      id: Date.now().toString(), rating: newRating, comment: newComment, author: "Operator", date: new Date().toISOString().split("T")[0]
    }]);
    setNewComment("");
    setNewRating(0);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft size={14} /> BACK
      </button>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 gradient-border">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-display font-bold text-foreground">{tool.name}</h1>
              {tool.recommended && (
                <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-primary/15 text-primary border border-primary/20">
                  <Award size={10} /> RECOMMENDED
                </span>
              )}
            </div>
            <StarRating rating={Math.round(tool.rating)} size={16} />
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{tool.description}</p>
            <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 capitalize">{tool.category}</span>
          </div>

          <div className="flex flex-col gap-2 sm:items-end shrink-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-md font-mono transition-all ${liked ? "bg-primary/15 text-primary shadow-neon-sm" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
            >
              <ThumbsUp size={14} className={liked ? "fill-primary" : ""} />
              {likeCount}
            </motion.button>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-md bg-primary/10 border border-primary/30 text-primary font-mono hover:bg-primary/20 hover:shadow-neon-sm transition-all"
            >
              <ExternalLink size={13} /> VISIT SITE
            </a>
          </div>
        </div>
      </motion.div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: DollarSign, label: "PRICE", value: tool.price },
          { icon: Target, label: "ACCURACY", value: tool.accuracy },
          { icon: Clock, label: "SPEED", value: tool.speed },
          { icon: Tag, label: "BEST_FOR", value: tool.bestFor },
        ].map(item => (
          <motion.div key={item.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 text-center">
            <item.icon size={16} className="text-primary mx-auto mb-2" />
            <p className="text-[10px] font-mono text-muted-foreground mb-1">{item.label}</p>
            <p className="text-sm font-mono text-foreground font-semibold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5">
        <h3 className="text-xs font-mono text-muted-foreground mb-3 flex items-center gap-2">
          <Zap size={14} className="text-primary" /> FEATURES
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(showAllFeatures ? tool.features : tool.features.slice(0, 4)).map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-mono text-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {f}
            </div>
          ))}
        </div>
        {tool.features.length > 4 && (
          <button onClick={() => setShowAllFeatures(!showAllFeatures)} className="text-[10px] font-mono text-primary mt-2 flex items-center gap-1">
            {showAllFeatures ? <><ChevronUp size={12} /> LESS</> : <><ChevronDown size={12} /> MORE ({tool.features.length - 4})</>}
          </button>
        )}
      </motion.div>

      {/* Reviews */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5">
        <h3 className="text-xs font-mono text-muted-foreground mb-4">
          {">"} REVIEWS ({localReviews.length})
        </h3>

        <div className="space-y-3 mb-4">
          {localReviews.length === 0 && (
            <p className="text-xs text-muted-foreground font-mono">No reviews yet. Be the first operator to review.</p>
          )}
          {localReviews.map(r => (
            <div key={r.id} className="bg-secondary/50 rounded-md p-3 border border-border/50">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-medium text-foreground">{r.author}</span>
                <StarRating rating={r.rating} size={11} />
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">{r.comment}</p>
              <p className="text-[9px] text-muted-foreground/60 font-mono mt-1">{r.date}</p>
            </div>
          ))}
        </div>

        {/* Add Review */}
        <div className="border-t border-border pt-4 space-y-3">
          <p className="text-[10px] font-mono text-muted-foreground">ADD_REVIEW:</p>
          <StarRating rating={newRating} size={16} interactive onChange={setNewRating} />
          <div className="flex gap-2">
            <input
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Write your analysis..."
              className="flex-1 text-xs px-3 py-2 rounded-md bg-secondary border border-border text-foreground font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button onClick={addReview} className="px-3 py-2 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-mono hover:bg-primary/20 transition-all">
              SUBMIT
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ToolDetailPage;
