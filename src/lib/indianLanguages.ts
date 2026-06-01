/** Supported voice / chat languages (website + Twilio + n8n) */
export type IndianLanguageCode = "en" | "hi" | "mr" | "ta";

export const INDIAN_CALL_LANGUAGES: {
  code: IndianLanguageCode;
  label: string;
  native: string;
}[] = [
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "en", label: "English", native: "English" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
];

const SUPPORTED = new Set<IndianLanguageCode>(["en", "hi", "mr", "ta"]);

export function isIndianLanguageCode(code: string): code is IndianLanguageCode {
  return SUPPORTED.has(code as IndianLanguageCode);
}

/** Map website UI lang or dropdown value to supported code */
export function normalizeIndianLanguageCode(
  raw: string | undefined | null
): IndianLanguageCode {
  const s = (raw || "").toString().trim().toLowerCase();
  if (isIndianLanguageCode(s)) return s;
  const aliases: Record<string, IndianLanguageCode> = {
    hindi: "hi",
    hinglish: "hi",
    english: "en",
    marathi: "mr",
    tamil: "ta",
  };
  if (aliases[s]) return aliases[s];
  return "en";
}

/** Detect from user message script (fallback when no dropdown) */
export function detectLanguageFromText(text: string): IndianLanguageCode {
  const t = (text || "").toString();
  if (!t.trim()) return "en";
  if (/[\u0B80-\u0BFF]/.test(t)) return "ta";
  if (/[\u0900-\u097F]/.test(t)) return "hi";
  return "en";
}
