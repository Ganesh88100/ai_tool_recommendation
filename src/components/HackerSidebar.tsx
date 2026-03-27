import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Database, GitCompare, MessageSquare, LogOut, Terminal, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/tools", label: "AI Tools", icon: Database },
  { path: "/compare", label: "Compare", icon: GitCompare },
  { path: "/reviews", label: "Reviews", icon: MessageSquare },
];

const HackerSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={`sticky top-0 h-screen border-r border-border bg-card/30 backdrop-blur-xl flex flex-col transition-all duration-300 ${collapsed ? "w-16" : "w-56"}`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border flex items-center gap-2">
        <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 neon-glow">
          <Shield className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <span className="text-xs font-display font-bold gradient-text block">AI HUB</span>
            <span className="text-[9px] font-mono text-muted-foreground">ANALYZER v3.7</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {navItems.map(item => {
          const isActive = location.pathname === item.path || (item.path === "/tools" && location.pathname.startsWith("/tool"));
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-mono transition-all ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-neon-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <item.icon size={16} className={isActive ? "text-primary" : ""} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-border space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-xs font-mono text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={16} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default HackerSidebar;
