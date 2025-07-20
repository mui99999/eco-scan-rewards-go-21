import React, { createContext, useContext, useState, ReactNode } from "react";

// 1. Define context type explicitly
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
};

// 2. Create context with explicit type
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  // 3. Fix JSX syntax - remove space around '='
  return (
    <LanguageContext.Provider value= {{ language, setLanguage }
}>
  { children }
  </LanguageContext.Provider>
  );
};

// 4. Define translations outside the hook
const TRANSLATIONS = {
  en: {
    index: "Welcome to EcoScan! 🌍",
    scan: "Scan Item",
    centers: "Find Centers",
    games: "Play Games",
    learn: "Learn",
    shop: "Shop Rewards",
    rewards: "Rewards",
    notFound: "Page Not Found",
    slogan: "Scan, Recycle, Earn, and Save Our Planet",
    mascotMessage: "Ready to make a difference today? 🌱",
    impactTitle: "Your Impact This Month",
    itemsRecycled: "Items Recycled",
    treesSaved: "Trees Saved",
    rank: "Rank",
    dailyChallenge: "Daily Challenge",
    challengeText: "Scan 3 plastic bottles today and earn 100 bonus Green$ points!",
    progressText: "Progress: 1/3 items scanned",
  },
  zh: {
    index: "歡迎使用EcoScan！🌍",
    scan: "掃描物品",
    centers: "尋找中心",
    games: "玩遊戲",
    learn: "學習",
    shop: "購物獎勵",
    rewards: "獎勵",
    notFound: "頁面未找到",
    slogan: "掃描、回收、賺取，拯救我們的星球",
    mascotMessage: "準備好今天改變嗎？🌱",
    impactTitle: "您本月的影響",
    itemsRecycled: "回收物品",
    treesSaved: "拯救樹木",
    rank: "排名",
    dailyChallenge: "每日挑戰",
    challengeText: "今日掃描3個塑膠瓶，賺取100獎勵Green$！",
    progressText: "進度：1/3 物品掃描",
  },
} as const;

// 5. Define valid keys and languages
type ValidLanguage = keyof typeof TRANSLATIONS;
type TranslationKey = keyof (typeof TRANSLATIONS)['en'];

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }

  // 6. Validate language
  const lang: ValidLanguage = context.language === 'zh' ? 'zh' : 'en';

  // 7. Return translation function
  return (key: TranslationKey) => TRANSLATIONS[lang][key];
};