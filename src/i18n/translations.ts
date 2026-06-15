import { en } from "./en";
import { hi } from "./hi";
import { mr } from "./mr";
import { te } from "./te";

export type Lang = "en" | "hi" | "mr" | "te";

export const translations = {
  en,
  hi,
  mr,
  te,
};

export type Translations = typeof en;
