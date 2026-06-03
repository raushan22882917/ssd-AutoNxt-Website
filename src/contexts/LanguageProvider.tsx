import { useState } from "react";
import { translations, type Lang } from "@/i18n/translations";
import { LanguageContext } from "@/contexts/LanguageContext";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem("autonxt-lang") as Lang) || "en"
  );

  const setLang = (newLang: Lang) => {
    localStorage.setItem("autonxt-lang", newLang);
    setLangState(newLang);
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
