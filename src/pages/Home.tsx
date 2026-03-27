import { useState } from "react";
import { motion } from "framer-motion";
import { Search, LogOut, Zap, LayoutDashboard, Compass } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AITool, getToolsByDomain, getAllTools } from "@/data/mockData";
import ToolCard from "@/components/ToolCard";
import ComparisonTable from "@/components/ComparisonTable";
import Dashboard from "@/components/Dashboard";
import FloatingAssistant from "@/components/FloatingAssistant";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [tools, setTools] = useState<AITool[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [compareIds, setCompareIds] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<"explore" | "dashboard">("explore");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    await new Promise(r => setTimeout(r, 1200));
    const results = getToolsByDomain(query);
    setTools(results.length > 0 ? results : getAllTools().slice(0, 6));
    setLoading(false);
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

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <div className="min-h-screen bg-background relative">
      {/* BG Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-[150px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-sm gradient-text hidden sm:block">AI Hub Analyzer</span>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={() => setTab("explore")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${tab === "explore" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <Compass size={14} /> Explore
            </button>
            <button onClick={() => setTab("dashboard")} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${tab === "dashboard" ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              <LayoutDashboard size={14} /> Dashboard
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">Hey, <span className="text-foreground font-medium">{user?.username}</span></span>
            <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {tab === "explore" ? (
          <>
            {/* Hero / Search */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Discover the <span className="gradient-text">Best AI Tools</span>
              </h1>
              <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
                Enter your domain and get AI-powered recommendations instantly.
              </p>
              <form onSubmit={handleSearch} className="max-w-lg mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="e.g., Trading, Coding, Content Creation..."
                  className="w-full pl-11 pr-24 py-3.5 rounded-xl bg-card/60 backdrop-blur border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon-sm transition-all"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-neon-purple text-primary-foreground text-sm font-medium hover:shadow-neon-sm transition-all">
                  Search
                </button>
              </form>

              {!searched && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {["Trading", "Coding", "Content Creation", "Design", "Data Science"].map(d => (
                    <button key={d} onClick={() => { setQuery(d); }} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors">
                      {d}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Loading */}
            {loading && <LoadingSpinner />}

            {/* Results */}
            {!loading && searched && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-sm text-muted-foreground mb-4">
                  Found <span className="text-foreground font-medium">{tools.length}</span> tools for "<span className="text-accent">{query}</span>"
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {tools.map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onLike={() => {}}
                      isCompareSelected={compareIds.has(tool.id)}
                      onCompareToggle={toggleCompare}
                    />
                  ))}
                </div>

                {comparedTools.length >= 2 && <ComparisonTable tools={comparedTools} />}
              </motion.div>
            )}
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-2xl font-bold mb-6">
              <span className="gradient-text">Dashboard</span>
            </h2>
            <Dashboard />
          </motion.div>
        )}
      </main>

      <FloatingAssistant />
    </div>
  );
};

export default Home;
