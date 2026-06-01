/**
 * Routes user messages: general chat vs call vs Zoom meeting vs demo booking.
 * Order: meeting → call → booking → chat (most specific first).
 */

export type ChatIntent = "chat" | "call_now" | "call_scheduled" | "meeting" | "booking";

const MEETING_RE =
  /zoom|video\s*(call|meeting)|online\s*meeting|virtual\s*meeting|(?:schedule|book)\s+(?:my\s+|a\s+|the\s+)?(?:sales\s+)?meeting|meeting\s+with\s+(?:the\s+)?sales|(?:talk|speak)\s+(?:to|with)\s+(?:a\s+)?sales|sales\s+(?:person|team|rep)|sales\s+meeting|meet\s+with\s+sales|मीटिंग|सेल्स\s*(?:से|के\s*साथ)|वीडियो\s*कॉल|वर्चुअल|ऑनलाइन\s*मीटिंग/i;

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

/** AI listed meeting fields — open Zoom form instead of staying in free chat. */
const AI_MEETING_FORM_RE =
  /full\s+name|preferred\s+date|preferred\s+model|yyyy-mm-dd|zoom\s+form|schedule\s+(?:the\s+)?meeting|मीटिंग\s+शेड्यूल/i;

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
  return (
    AI_BOOKING_RE.test(reply) &&
    !MEETING_RE.test(reply) &&
    !CALL_RE.test(reply) &&
    !aiSuggestsMeeting(reply)
  );
}

/** Gemini listed meeting intake fields — show Zoom form in chat. */
export function aiSuggestsMeeting(reply: string): boolean {
  const r = reply.trim();
  if (!r) return false;
  const meetingContext =
    MEETING_RE.test(r) ||
    /zoom|video\s*call|sales\s+(?:person|team)|मीटिंग/i.test(r);
  const listsFields =
    AI_MEETING_FORM_RE.test(r) &&
    (/email/i.test(r) || /phone/i.test(r)) &&
    (r.match(/full\s+name|email|phone/gi)?.length ?? 0) >= 2;
  return meetingContext && listsFields;
}

export function getIntentAssistantReply(
  intent: ChatIntent,
  lang: string,
  callDelaySeconds: number
): string {
  switch (intent) {
    case "meeting":
      return lang === "hi"
        ? "नीचे **Zoom मीटिंग फॉर्म** खुला है — नाम, ईमेल, फोन, मॉडल, शहर, तारीख और समय (10 AM–5 PM IST) भरें। Zoom लिंक ईमेल पर मिलेगा।"
        : "The **Zoom meeting form** is open below — enter name, email, phone, model, city, date & time (10 AM–5 PM IST). You'll get the Zoom link by email.";
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
