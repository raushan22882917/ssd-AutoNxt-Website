import { createContext, useContext, useState, useEffect } from "react";
import { translations, type Lang, type Translations } from "@/i18n/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => null,
  t: translations.en,
});

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

export const useLang = () => useContext(LanguageContext);
