export interface CallCallbackPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  request_type: "sales" | "support";
  /** Indian language code for Twilio voice + Gemini (hi, en, bn, ta, te, mr, gu, kn, ml, pa, or, as, ur) */
  language?: string;
  message: string;
  preferred_date?: string;
  preferred_time?: string;
  schedule_mode?: "now" | "scheduled";
  /** Seconds to wait before placing the outbound call (website uses 10 for "call now") */
  call_delay_seconds?: number;
  chat_session_id?: string;
  source?: string;
}

export interface CallCallbackResult {
  success: boolean;
  message?: string;
  formId?: string;
  callSid?: string;
  route?: string;
  error?: string;
}

const PROD_CALLBACK_URL =
  "https://autonxt.app.n8n.cloud/webhook/autonxt-form-callback";

/** Use Vite proxy in dev to avoid browser CORS issues */
const CALLBACK_URL =
  import.meta.env.DEV
    ? "/api/n8n-form-callback"
    : PROD_CALLBACK_URL;

export async function requestPhoneCallback(
  payload: CallCallbackPayload
): Promise<CallCallbackResult> {
  if (!payload.customer_phone?.trim()) {
    return { success: false, error: "Phone number is required" };
  }

  try {
    const response = await fetch(CALLBACK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        language: payload.language,
        user_language: payload.language,
        userLanguage: payload.language,
        source: payload.source || "autonxt-website-chat",
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      return {
        success: false,
        error: text || `Request failed (${response.status})`,
      };
    }

    try {
      const data = JSON.parse(text) as CallCallbackResult;
      return {
        success: data.success !== false,
        message: data.message,
        formId: data.formId,
        callSid: data.callSid,
        route: data.route,
      };
    } catch {
      return {
        success: true,
        message: text.trim() || "Callback scheduled.",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
