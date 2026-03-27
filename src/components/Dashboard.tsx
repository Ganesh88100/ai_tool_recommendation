import { motion } from "framer-motion";
import { TrendingUp, Heart, Star, BarChart3 } from "lucide-react";
import { getTopLiked, getTopRated, getTrendingDomains } from "@/data/mockData";
import StarRating from "./StarRating";

const Dashboard = () => {
  const topLiked = getTopLiked();
  const topRated = getTopRated();
  const trending = getTrendingDomains();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <Heart size={16} className="text-neon-pink" /> Top Liked
        </h3>
        <div className="space-y-3">
          {topLiked.map((t, i) => (
            <div key={t.id} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium mr-2">{i + 1}.</span>{t.name}
              </span>
              <span className="text-xs text-accent font-mono">{t.likes}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <Star size={16} className="text-accent" /> Top Rated
        </h3>
        <div className="space-y-3">
          {topRated.map((t, i) => (
            <div key={t.id} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium mr-2">{i + 1}.</span>{t.name}
              </span>
              <StarRating rating={Math.round(t.rating)} size={12} />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
          <TrendingUp size={16} className="text-success" /> Trending Domains
        </h3>
        <div className="space-y-3">
          {trending.map(d => (
            <div key={d.domain} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground capitalize">{d.domain}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-neon-purple rounded-full" style={{ width: `${(d.count / 4) * 100}%` }} />
                </div>
                <span className="text-xs text-accent font-mono">{d.count}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
