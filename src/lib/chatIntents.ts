/**
 * Routes user messages: general chat vs call vs Google Meet vs demo booking.
 * Order: meeting → call → booking → chat (most specific first).
 */

export type ChatIntent = "chat" | "call_now" | "call_scheduled" | "meeting" | "booking";

const MEETING_RE =
  /google\s*meet|zoom|microsoft\s*teams|teams\s*meeting|video\s*(call|meeting)|online\s*meeting|virtual\s*meeting|schedule\s+(a\s+)?(sales\s+)?meeting|sales\s+meeting|meet\s+with\s+sales|मीटिंग|वीडियो\s*कॉल|वर्चुअल|ऑनलाइन\s*मीटिंग/i;

const CALL_RE =
  /(?:call\s+me|phone\s+call|ring\s+me|give\s+me\s+a\s+call|get\s+a\s+call|callback|talk\s+on\s+(?:the\s+)?phone|voice\s+call|मुझे\s+कॉल|कॉल\s+कर(?:ो|ें|े)?|फोन\s+पर\s+बात|फोन\s+कर(?:ो|ें|े)?|कॉल\s+चाहिए)/i;

const CALL_SCHEDULE_RE =
  /schedule\s+(a\s+)?call|call\s+later|call\s+at|callback\s+at|कॉल\s+शेड्यूल|बाद\s*में\s+कॉल|निर्धारित\s+समय\s+पर\s+कॉल/i;

const CALL_SCHEDULE_HINT_RE =
  /schedule|later|tomorrow|बाद\s*में|निर्धारित|pick\s+a\s+time|date\s+and\s+time|समय\s+पर/i;

const BOOKING_RE =
  /(?:book|reserve)\s*(?:a\s+)?(?:demo|test\s*drive|visit|appointment)|test\s*drive|site\s*visit|field\s*demo|tractor\s*demo|demo\s*booking|बुक\s*(?:कर|करूं)?|डेमो|मुलाकात|दौरा|खेत\s*पर\s*डेमो/i;

/** AI reply suggests demo booking (not phone / video meeting). */
const AI_BOOKING_RE =
  /book\s*(?:a\s+)?demo|test\s*drive|site\s*visit|booking\s*form|fill\s+(?:the\s+)?form\s+below|बुकिंग\s*फॉर्म|डेमो\s*बुक/i;

export function detectChatIntent(text: string): ChatIntent {
  const raw = text.trim();
  if (!raw) return "chat";

  if (MEETING_RE.test(raw)) return "meeting";

  if (CALL_SCHEDULE_RE.test(raw)) return "call_scheduled";

  if (CALL_RE.test(raw)) {
    return CALL_SCHEDULE_HINT_RE.test(raw) ? "call_scheduled" : "call_now";
  }

  if (BOOKING_RE.test(raw)) return "booking";

  return "chat";
}

export function aiSuggestsBooking(reply: string): boolean {
  return AI_BOOKING_RE.test(reply) && !MEETING_RE.test(reply) && !CALL_RE.test(reply);
}

export function getIntentAssistantReply(
  intent: ChatIntent,
  lang: string,
  callDelaySeconds: number
): string {
  switch (intent) {
    case "meeting":
      return lang === "hi"
        ? "नीचे **Google Meet** फॉर्म भरें — तारीख और समय (10 AM–5 PM IST) चुनें। सेल्स टीम और आपको Meet लिंक ईमेल पर मिलेगा।"
        : "Fill the **Google Meet** form below — pick date & time (10 AM–5 PM IST). You and our sales team will get the Meet link by email.";
    case "call_now":
      return lang === "hi"
        ? `नीचे **फोन कॉल** फॉर्म भरें, भाषा चुनें, Submit दबाएँ। **${callDelaySeconds} सेकंड** में हम कॉल करेंगे।`
        : `Use the **phone call** form below, choose your language, then Submit. We'll call you in **${callDelaySeconds} seconds**.`;
    case "call_scheduled":
      return lang === "hi"
        ? "नीचे फॉर्म में **तारीख/समय** चुनें — निर्धारित समय पर कॉल होगी (तुरंत कॉल नहीं)।"
        : "Fill the form below and pick a **date & time** — we'll call at that slot (not immediately).";
    case "booking":
      return lang === "hi"
        ? "नीचे **डेमो / साइट विज़िट** बुकिंग फॉर्म भरें — सेल्स टीम आपसे संपर्क करेगी।"
        : "Fill the **demo / site visit** booking form below — our sales team will contact you.";
    default:
      return "";
  }
}
