import { Outlet } from "react-router-dom";
import HackerSidebar from "@/components/HackerSidebar";
import FloatingAssistant from "@/components/FloatingAssistant";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-background scanlines matrix-bg">
      <HackerSidebar />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
      <FloatingAssistant />
    </div>
  );
};

export default AppLayout;
