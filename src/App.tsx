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
import { LanguageProvider, LanguageToggle } from "./utils/useTranslation"; // Updated import

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LanguageProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-green-100">
              <header className="w-full bg-green-500 text-white p-4 flex justify-start">
                <LanguageToggle />
              </header>
              <main className="flex flex-col items-center justify-center flex-grow p-4">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/scan" element={<ScanPage />} />
                  <Route path="/centers" element={<CentersPage />} />
                  <Route path="/games" element={<GamesPage />} />
                  <Route path="/learn" element={<LearnPage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;