import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Grid3X3, List, Filter, ThumbsUp, Award, ExternalLink } from "lucide-react";
import { getAllTools, getToolsByDomain, AITool } from "@/data/mockData";
import StarRating from "@/components/StarRating";

const ToolsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"rating" | "likes" | "name">("rating");
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [likedTools, setLikedTools] = useState<Set<string>>(new Set());
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  const tools = useMemo(() => {
    let result = searchTerm ? getToolsByDomain(searchTerm) : getAllTools();
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "likes") return (likeCounts[b.id] ?? b.likes) - (likeCounts[a.id] ?? a.likes);
      return a.name.localeCompare(b.name);
    });
    return result;
  }, [searchTerm, sortBy, likeCounts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTerm(query);
    setSearchParams(query ? { q: query } : {});
  };

  const handleLike = (id: string) => {
    if (likedTools.has(id)) return;
    setLikedTools(prev => new Set(prev).add(id));
    setLikeCounts(prev => {
      const tool = getAllTools().find(t => t.id === id);
      return { ...prev, [id]: (prev[id] ?? tool?.likes ?? 0) + 1 };
    });
  };

  const toggleCompare = (id: string) => {
    setCompareIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const comparedTools = tools.filter(t => compareIds.has(t.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold gradient-text">AI TOOLS DATABASE</h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            {">"} {tools.length} tools indexed {searchTerm && `for "${searchTerm}"`}
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/60" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Filter tools..."
            className="pl-9 pr-20 py-2.5 rounded-md bg-card/60 border border-border text-foreground font-mono text-xs placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-sm transition-all w-full sm:w-72"
          />
          <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-sm bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono hover:bg-primary/20 transition-all">
            SCAN
          </button>
        </form>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <Grid3X3 size={14} />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
            <List size={14} />
          </button>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as "rating" | "likes" | "name")}
            className="bg-card border border-border text-foreground font-mono text-[10px] rounded-md px-2 py-1.5 focus:outline-none focus:border-primary/50"
          >
            <option value="rating">Sort: Rating</option>
            <option value="likes">Sort: Likes</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>
        {compareIds.size >= 2 && (
          <button
            onClick={() => navigate(`/compare?ids=${[...compareIds].join(",")}`)}
            className="px-3 py-1.5 rounded-md bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono hover:bg-primary/20 hover:shadow-neon-sm transition-all"
          >
            COMPARE ({compareIds.size})
          </button>
        )}
      </div>

      {/* Tools Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}>
        {tools.map((tool, i) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.5) }}
            className={`glass-card-hover p-4 ${viewMode === "list" ? "flex items-center gap-4" : ""}`}
          >
            <div className={viewMode === "list" ? "flex-1 flex items-center gap-4" : ""}>
              <div className={viewMode === "list" ? "flex-1" : "mb-3"}>
                <div className="flex items-center gap-2 mb-1">
                  <button onClick={() => navigate(`/tool/${tool.id}`)} className="font-mono text-sm font-semibold text-foreground hacker-link">
                    {tool.name}
                  </button>
                  {tool.recommended && (
                    <span className="flex items-center gap-0.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-primary/15 text-primary border border-primary/20">
                      <Award size={9} /> TOP
                    </span>
                  )}
                </div>
                <StarRating rating={Math.round(tool.rating)} size={12} />
                {viewMode === "grid" && <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{tool.description}</p>}
              </div>

              <div className="flex items-center gap-2 mt-3">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(tool.id)}
                  className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-md font-mono transition-all ${likedTools.has(tool.id) ? "bg-primary/15 text-primary shadow-neon-sm" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
                >
                  <ThumbsUp size={12} className={likedTools.has(tool.id) ? "fill-primary" : ""} />
                  {likeCounts[tool.id] ?? tool.likes}
                </motion.button>
                <button onClick={() => navigate(`/tool/${tool.id}`)} className="text-[10px] px-2.5 py-1.5 rounded-md bg-secondary text-muted-foreground hover:text-foreground font-mono transition-colors">
                  DETAILS
                </button>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-[10px] px-2 py-1.5 rounded-md bg-secondary text-muted-foreground hover:text-accent font-mono transition-colors">
                  <ExternalLink size={11} />
                </a>
                <label className="flex items-center gap-1 text-[10px] text-muted-foreground cursor-pointer font-mono ml-auto">
                  <input type="checkbox" checked={compareIds.has(tool.id)} onChange={() => toggleCompare(tool.id)} className="accent-primary w-3 h-3" />
                  CMP
                </label>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
