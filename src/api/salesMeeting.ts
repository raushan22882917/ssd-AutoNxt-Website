import type { IndianLanguageCode } from "@/lib/indianLanguages";

export interface SalesMeetingPayload {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city?: string;
  tractor_model?: string;
  topic?: string;
  preferred_date: string;
  preferred_time: string;
  timezone?: string;
  language?: IndianLanguageCode | string;
  chat_session_id?: string;
  source?: string;
}

export interface SalesMeetingResult {
  success: boolean;
  message?: string;
  meetLink?: string;
  meetingId?: string;
  scheduledAt?: string;
  error?: string;
}

const PROD_URL =
  "https://autonxt.app.n8n.cloud/webhook/autonxt-schedule-meeting";

const MEETING_URL = import.meta.env.DEV
  ? "/api/n8n-schedule-meeting"
  : PROD_URL;

export async function scheduleSalesMeeting(
  payload: SalesMeetingPayload
): Promise<SalesMeetingResult> {
  if (!payload.customer_name?.trim() || !payload.customer_email?.trim()) {
    return { success: false, error: "Name and email are required" };
  }
  if (!payload.customer_phone?.trim()) {
    return { success: false, error: "Phone is required" };
  }
  if (!payload.preferred_date?.trim() || !payload.preferred_time?.trim()) {
    return { success: false, error: "Date and time are required" };
  }

  try {
    const response = await fetch(MEETING_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        request_type: "sales_meeting",
        timezone: payload.timezone || "Asia/Kolkata",
        language: payload.language,
        userLanguage: payload.language,
        source: payload.source || "autonxt-website-chat",
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      return { success: false, error: text || `Failed (${response.status})` };
    }

    try {
      const data = JSON.parse(text) as SalesMeetingResult;
      return {
        success: data.success !== false,
        message: data.message,
        meetLink: data.meetLink,
        meetingId: data.meetingId,
        scheduledAt: data.scheduledAt,
      };
    } catch {
      return { success: true, message: text.trim() || "Meeting scheduled." };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
