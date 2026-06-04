import { createContext, useContext } from "react";
import { en } from "@/i18n/en";
import type { Lang } from "@/i18n/translations";

export type Translations = typeof en;

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
};

export const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => null,
  t: en,
});

export const useLang = () => useContext(LanguageContext);
