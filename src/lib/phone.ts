/**
 * Normalize phone for outbound callbacks. Accepts any country when + or full international digits are provided.
 * Ten-digit numbers without a country code are treated as India (+91) for local users only.
 */
export function normalizePhoneForCallback(raw: string): string {
  const trimmed = (raw || "").trim();
  if (!trimmed) return "";

  const cleaned = trimmed.replace(/[^\d+]/g, "");
  if (!cleaned) return "";

  if (cleaned.startsWith("+")) {
    const digits = cleaned.slice(1).replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) return "";
    return `+${digits}`;
  }

  const digits = cleaned.replace(/\D/g, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length >= 8 && digits.length <= 15) return `+${digits}`;

  return "";
}

export function isValidCallbackPhone(raw: string): boolean {
  return normalizePhoneForCallback(raw).length > 0;
}

export function formatPhoneDisplay(e164: string): string {
  return e164 || "";
}
