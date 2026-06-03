import { useState, useEffect } from "react";
import { en } from "@/i18n/en";
import type { Lang, Translations } from "@/i18n/translations";
import { LanguageContext } from "@/contexts/LanguageContext";

// English is bundled eagerly (default, smallest at ~99 KB source).
// Other languages are loaded as separate async chunks — they only download
// when the user actively switches language.
function loadTranslation(lang: Lang): Promise<Translations> {
  switch (lang) {
    case "hi": return import("@/i18n/hi").then((m) => m.hi as Translations);
    case "mr": return import("@/i18n/mr").then((m) => m.mr as Translations);
    case "te": return import("@/i18n/te").then((m) => m.te as Translations);
    default:   return Promise.resolve(en);
  }
}

// Synchronously pick the best starting translation:
// English is always available immediately; if the user stored a different
// language we start with English and swap once the file loads (<200 ms).
const storedLang = (localStorage.getItem("autonxt-lang") as Lang) || "en";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(storedLang);
  const [t, setT] = useState<Translations>(en); // always start with English

  // When the stored (or selected) language is not English, fetch it once.
  useEffect(() => {
    let cancelled = false;
    loadTranslation(lang).then((trans) => {
      if (!cancelled) setT(trans);
    });
    return () => { cancelled = true; };
  }, [lang]);

  const setLang = (newLang: Lang) => {
    localStorage.setItem("autonxt-lang", newLang);
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
