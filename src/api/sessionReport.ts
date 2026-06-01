import { buildTranscriptText, getSessionEvents, getSessionProfile } from "@/lib/sessionLog";

export interface SessionReportPayload {
  session_id: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  language?: string;
  trigger: "chat_close" | "call_done" | "booking_done" | "meeting_done" | "manual";
  meet_link?: string;
  booking_id?: string;
  call_sid?: string;
  meeting_id?: string;
  extra_notes?: string;
}

export interface SessionReportResult {
  success: boolean;
  message?: string;
  error?: string;
}

const PROD_URL =
  "https://autonxt.app.n8n.cloud/webhook/autonxt-session-report";

const REPORT_URL = import.meta.env.DEV
  ? "/api/n8n-session-report"
  : PROD_URL;

export async function sendSessionReportToSales(
  payload: SessionReportPayload
): Promise<SessionReportResult> {
  const events = getSessionEvents();
  const profile = getSessionProfile();
  const transcript = buildTranscriptText(events);

  if (!transcript.trim() && !payload.extra_notes) {
    return { success: true, message: "No transcript to send" };
  }

  try {
    const response = await fetch(REPORT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        customer_name: payload.customer_name || profile.name,
        customer_email: payload.customer_email || profile.email,
        customer_phone: payload.customer_phone || profile.phone,
        language: payload.language || profile.language,
        transcript,
        events,
        event_count: events.length,
        source: "autonxt-website-chat",
      }),
    });

    const text = await response.text();
    if (!response.ok) {
      return { success: false, error: text || `Failed (${response.status})` };
    }

    try {
      const data = JSON.parse(text) as SessionReportResult;
      return { success: data.success !== false, message: data.message };
    } catch {
      return { success: true, message: "Report sent to sales team." };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
