import { createContext, useContext } from "react";
import { translations, type Lang, type Translations } from "@/i18n/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => null,
  t: translations.en,
});

export const useLang = () => useContext(LanguageContext);
