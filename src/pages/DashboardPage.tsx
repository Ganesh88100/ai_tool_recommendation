import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Zap, Activity, BarChart3, Star, Heart, Terminal as TerminalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getTopLiked, getTopRated, getTrendingDomains, getCategories, getToolsByCategory } from "@/data/mockData";
import StarRating from "@/components/StarRating";
import TerminalLog from "@/components/TerminalLog";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const topLiked = getTopLiked(5);
  const topRated = getTopRated(5);
  const trending = getTrendingDomains();
  const categories = getCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/tools?q=${encodeURIComponent(query)}`);
  };

  const categoryIcons: Record<string, string> = {
    trading: "📊", coding: "💻", "content creation": "✍️", design: "🎨",
    "data science": "🧬", productivity: "⚡", marketing: "📈", education: "📚", healthcare: "🏥"
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome, <span className="gradient-text neon-text">Operator</span>
        </h1>
        <p className="text-muted-foreground text-sm font-mono">
          {">"} System online. 110+ AI tools indexed and ready for analysis.
        </p>
      </motion.div>

      {/* Search */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative max-w-2xl"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/60 w-4 h-4" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search domain: Trading, Coding, Content Creation..."
          className="w-full pl-11 pr-28 py-3.5 rounded-lg bg-card/60 backdrop-blur border border-border text-foreground font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-sm transition-all"
        />
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-medium hover:bg-primary/20 hover:shadow-neon-sm transition-all">
          ANALYZE
        </button>
      </motion.form>

      {/* Categories Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2 className="text-sm font-mono text-muted-foreground mb-3 flex items-center gap-2">
          <Zap size={14} className="text-primary" /> CATEGORIES
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {categories.map((cat, i) => {
            const count = getToolsByCategory(cat).length;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                onClick={() => navigate(`/tools?q=${encodeURIComponent(cat)}`)}
                className="glass-card-hover p-4 text-left group"
              >
                <span className="text-2xl mb-2 block">{categoryIcons[cat] || "🤖"}</span>
                <span className="text-xs font-mono text-foreground capitalize block group-hover:text-primary transition-colors">{cat}</span>
                <span className="text-[10px] font-mono text-muted-foreground">{count} tools</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Top Liked */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
            <Heart size={14} className="text-destructive" /> TOP_LIKED
          </h3>
          <div className="space-y-3">
            {topLiked.map((t, i) => (
              <button key={t.id} onClick={() => navigate(`/tool/${t.id}`)} className="flex items-center justify-between w-full group">
                <span className="text-xs text-muted-foreground font-mono">
                  <span className="text-primary mr-2">{String(i + 1).padStart(2, '0')}</span>
                  <span className="group-hover:text-primary transition-colors">{t.name}</span>
                </span>
                <span className="text-[10px] text-primary font-mono">{t.likes}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Top Rated */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
            <Star size={14} className="text-accent" /> TOP_RATED
          </h3>
          <div className="space-y-3">
            {topRated.map((t, i) => (
              <button key={t.id} onClick={() => navigate(`/tool/${t.id}`)} className="flex items-center justify-between w-full group">
                <span className="text-xs text-muted-foreground font-mono">
                  <span className="text-primary mr-2">{String(i + 1).padStart(2, '0')}</span>
                  <span className="group-hover:text-primary transition-colors">{t.name}</span>
                </span>
                <StarRating rating={Math.round(t.rating)} size={10} />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Trending Domains */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5">
          <h3 className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
            <TrendingUp size={14} className="text-primary" /> TRENDING_DOMAINS
          </h3>
          <div className="space-y-3">
            {trending.map(d => (
              <button key={d.domain} onClick={() => navigate(`/tools?q=${encodeURIComponent(d.domain)}`)} className="flex items-center justify-between w-full group">
                <span className="text-xs text-muted-foreground font-mono capitalize group-hover:text-primary transition-colors">{d.domain}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(d.count / 20) * 100}%` }} />
                  </div>
                  <span className="text-[10px] text-primary font-mono">{d.count}</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Terminal Log */}
      <TerminalLog />
    </div>
  );
};

export default DashboardPage;
