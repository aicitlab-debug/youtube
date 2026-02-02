import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CategoryChips from "@/components/CategoryChips";
import VideoGrid from "@/components/VideoGrid";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} />
      
      <main
        className={`pt-14 transition-all duration-200 ${
          sidebarOpen ? "ml-60" : "ml-[72px]"
        }`}
      >
        <div className="px-6">
          <CategoryChips />
          <VideoGrid />
        </div>
      </main>
    </div>
  );
};

export default Index;
