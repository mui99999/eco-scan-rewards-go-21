import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ScanPage from "./pages/ScanPage";
import CentersPage from "./pages/CentersPage";
import GamesPage from "./pages/GamesPage";
import LearnPage from "./pages/LearnPage";
import ShopPage from "./pages/ShopPage";
import RewardsPage from "./pages/RewardsPage";
import NotFound from "./pages/NotFound";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Language Context
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext)!; // Non-null assertion as we ensure provider exists
  const t = {
    en: "ENG | 中文",
    zh: "ENG | 中文",
  };

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "zh" : "en")}
      className="focus:outline-none text-white"
    >
      <span className={language === "en" ? "font-bold" : ""}>ENG</span> |{' '}
      <span className={language === "zh" ? "font-bold" : ""}>中文</span>
    </button>
  );
};

const translations = {
  en: {
    index: "Welcome to Eco Scan Rewards!",
    scan: "Scan to Earn Rewards",
    centers: "Recycling Centers",
    games: "Eco Games",
    learn: "Learn About Sustainability",
    shop: "Eco Shop",
    rewards: "Your Rewards",
    notFound: "Page Not Found",
  },
  zh: {
    index: "歡迎使用環保掃描獎勵！",
    scan: "掃描賺取獎勵",
    centers: "回收中心",
    games: "環保遊戲",
    learn: "了解可持續發展",
    shop: "環保商店",
    rewards: "您的獎勵",
    notFound: "頁面未找到",
  },
} as const;

interface PageProps {
  title: string;
}

const AppContent = () => {
  const { language } = useContext(LanguageContext)!;
  const t = translations[language];

  return (
    <div className="min-h-screen bg-green-100">
      <header className="w-full bg-green-500 text-white p-4 flex justify-start">
        <LanguageToggle />
      </header>
      <main className="flex flex-col items-center justify-center flex-grow p-4">
        <Routes>
          <Route path="/" element={<Index title={t.index} />} />
          <Route path="/scan" element={<ScanPage title={t.scan} />} />
          <Route path="/centers" element={<CentersPage title={t.centers} />} />
          <Route path="/games" element={<GamesPage title={t.games} />} />
          <Route path="/learn" element={<LearnPage title={t.learn} />} />
          <Route path="/shop" element={<ShopPage title={t.shop} />} />
          <Route path="/rewards" element={<RewardsPage title={t.rewards} />} />
          <Route path="*" element={<NotFound title={t.notFound} />} />
        </Routes>
      </main>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;