export type SessionEventType =
  | "chat_user"
  | "chat_assistant"
  | "call_requested"
  | "call_completed"
  | "booking_submitted"
  | "meeting_scheduled";

export interface SessionEvent {
  type: SessionEventType;
  text: string;
  at: string;
  meta?: Record<string, string | undefined>;
}

const LOG_KEY = "autonxt-session-events";
const PROFILE_KEY = "autonxt-session-profile";
export const CHAT_SESSION_ID_KEY = "autonxt-ai-chat-session";

export interface SessionProfile {
  name?: string;
  email?: string;
  phone?: string;
  language?: string;
}

function readLog(): SessionEvent[] {
  try {
    const raw = sessionStorage.getItem(LOG_KEY);
    return raw ? (JSON.parse(raw) as SessionEvent[]) : [];
  } catch {
    return [];
  }
}

function writeLog(events: SessionEvent[]) {
  sessionStorage.setItem(LOG_KEY, JSON.stringify(events.slice(-200)));
}

export function appendSessionEvent(
  type: SessionEventType,
  text: string,
  meta?: Record<string, string | undefined>
) {
  const events = readLog();
  events.push({ type, text, at: new Date().toISOString(), meta });
  writeLog(events);
}

export function updateSessionProfile(profile: Partial<SessionProfile>) {
  const prev: SessionProfile = JSON.parse(
    sessionStorage.getItem(PROFILE_KEY) || "{}"
  );
  sessionStorage.setItem(
    PROFILE_KEY,
    JSON.stringify({ ...prev, ...profile })
  );
}

export function getSessionProfile(): SessionProfile {
  try {
    return JSON.parse(sessionStorage.getItem(PROFILE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getSessionEvents(): SessionEvent[] {
  return readLog();
}

export function buildTranscriptText(events: SessionEvent[]): string {
  return events
    .map((e) => {
      const label =
        e.type === "chat_user"
          ? "Customer"
          : e.type === "chat_assistant"
            ? "AI"
            : e.type.replace(/_/g, " ");
      return `[${e.at}] ${label}: ${e.text}`;
    })
    .join("\n");
}

/** Wipes chat transcript log, profile, and n8n session id (new session on next message). */
export function clearChatSession(): void {
  sessionStorage.removeItem(LOG_KEY);
  sessionStorage.removeItem(PROFILE_KEY);
  sessionStorage.removeItem(CHAT_SESSION_ID_KEY);
}

export function createChatSessionId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `session-${Date.now()}`;
}
