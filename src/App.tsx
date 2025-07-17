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
import React, { createContext, useState, useContext } from "react";

const queryClient = new QueryClient();

// Language Context
const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
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
    index: "歡迎使用環保掃描獎勵！ (Foon1 jing4 si3 jung6 bong1 bou2 so2 cim1 biu1 ziu3 leoi6!)",
    scan: "掃描賺取獎勵 (Sop1 cim1 jaam6 ceoi2 ziu3 leoi6)",
    centers: "回收中心 (Wui4 sai1 jung2 sam1)",
    games: "環保遊戲 (Bong1 bou2 jing4 wai6)",
    learn: "了解可持續發展 (Ji5 haau6 ho2 keoi5 keui4 faat3 zin2)",
    shop: "環保商店 (Bong1 bou2 soeng1 dim3)",
    rewards: "您的獎勵 (Neih5 dik1 ziu3 leoi6)",
    notFound: "頁面未找到 (Jip6 min6 mei6 zaau2 dou3)",
  };
};

const AppContent = () => {
  const { language } = useContext(LanguageContext);
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

const App = () => (
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

export default App;