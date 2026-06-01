import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MessageCircle,
  X,
  Sparkles,
  Send,
  Loader,
  Calendar,
  PhoneCall,
  RotateCcw,
} from "lucide-react";
import { requestPhoneCallback } from "@/api/callCallback";
import { isValidCallbackPhone, normalizePhoneForCallback } from "@/lib/phone";
import { scheduleSalesMeeting } from "@/api/salesMeeting";
import { sendSessionReportToSales } from "@/api/sessionReport";
import { useLang } from "@/contexts/LanguageContext";
import {
  appendSessionEvent,
  updateSessionProfile,
  clearChatSession,
  createChatSessionId,
  CHAT_SESSION_ID_KEY,
} from "@/lib/sessionLog";
import {
  detectLanguageFromText,
  INDIAN_CALL_LANGUAGES,
  normalizeIndianLanguageCode,
  type IndianLanguageCode,
} from "@/lib/indianLanguages";
import {
  aiSuggestsBooking,
  aiSuggestsMeeting,
  detectChatIntent,
  getIntentAssistantReply,
  isMeetingScheduleRequest,
  type ChatIntent,
} from "@/lib/chatIntents";
import { getSessionClock } from "@/lib/relativeDate";

const logoImg = "/small-logo-white.png";
const N8N_WEBHOOK_URL = "https://autonxt.app.n8n.cloud/webhook/1b0b4ec9-24d5-40e0-aced-f9d107f81a86/chat";
const WELCOME_MESSAGE = `👋 AutoNxt AI में आपका स्वागत है / Welcome to AutoNxt AI

मैं इलेक्ट्रिक ट्रैक्टर और स्मार्ट खेती के बारे में आपकी मदद करता हूँ।
I help you explore electric tractors and smart agriculture.

आप **हिंदी**, **English**, **मराठी**, या **தமிழ்** में पूछ सकते हैं — जिस भाषा में पूछेंगे, उसी में जवाब मिलेगा।

नीचे **Talk with agent** (फोन) या **Schedule meeting** (Zoom) चुनें — या लिखें: “एजेंट से बात करो”, “मीटिंग शेड्यूल करो”।`;

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface N8nChatResponse {
  output?: string;
  response?: string;
  message?: string;
  reply?: string;
  text?: string;
  bookingId?: string;
  bookingUrl?: string;
  success?: boolean;
}

interface BookingFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  tractor_model: string;
  city: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
}

const TRACTOR_MODELS = ["X45 C2", "H55C2", "X27H2"] as const;

const CALL_NOW_DELAY_SECONDS = 10;

function closeAllForms(setters: {
  setShowCallForm: (v: boolean) => void;
  setShowMeetingForm: (v: boolean) => void;
  setShowBookingForm: (v: boolean) => void;
}) {
  setters.setShowCallForm(false);
  setters.setShowMeetingForm(false);
  setters.setShowBookingForm(false);
}

function getCallFormPrompt(lang: string): string {
  if (lang === "hi") {
    return `**Talk with agent** — नीचे फॉर्म भरें, **भाषा** चुनें, Submit दबाएँ। **${CALL_NOW_DELAY_SECONDS} सेकंड** में एजेंट कॉल करेगा।`;
  }
  return `**Talk with agent** — fill the form below, choose your **language**, then tap **Submit**. Our agent will call you in **${CALL_NOW_DELAY_SECONDS} seconds**.`;
}

function getScheduledCallPrompt(lang: string): string {
  if (lang === "hi") {
    return "कृपया फॉर्म भरें और तारीख/समय चुनें। हम निर्धारित समय पर कॉल करेंगे — तुरंत कॉल नहीं होगी।";
  }
  return "Fill in the form and pick a date & time. We'll call at your scheduled slot — no immediate call.";
}

function callQueuedMessage(phone: string, lang: string): string {
  if (lang === "hi") {
    return `✅ फॉर्म सबमिट हो गया। **${CALL_NOW_DELAY_SECONDS} सेकंड** में **${phone}** पर AutonXT कॉल करेगा।`;
  }
  return `✅ Form submitted. AutonXT will call **${phone}** in **${CALL_NOW_DELAY_SECONDS} seconds**.`;
}

function callScheduledMessage(date: string, time: string, lang: string): string {
  const when = [date, time].filter(Boolean).join(" at ") || "your chosen time";
  if (lang === "hi") {
    return `✅ कॉल शेड्यूल हो गई: **${when}**। पुष्टि के लिए टीम संपर्क करेगी।`;
  }
  return `✅ Call scheduled for **${when}**. Our team will confirm shortly.`;
}

function languageLabel(code: IndianLanguageCode): string {
  const row = INDIAN_CALL_LANGUAGES.find((l) => l.code === code);
  return row ? `${row.native} (${row.label})` : code;
}

function getOrCreateSessionId(): string {
  const existing = sessionStorage.getItem(CHAT_SESSION_ID_KEY);
  if (existing) return existing;

  const id = createChatSessionId();
  sessionStorage.setItem(CHAT_SESSION_ID_KEY, id);
  return id;
}

function getWelcomeMessages(welcomeText: string): Message[] {
  return [{ role: "assistant", text: welcomeText }];
}

function ChatMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h3 className="mt-3 mb-1.5 text-base font-semibold text-gray-900 first:mt-0">
            {children}
          </h3>
        ),
        h2: ({ children }) => (
          <h4 className="mt-3 mb-1.5 text-sm font-semibold text-gray-900 first:mt-0">
            {children}
          </h4>
        ),
        h3: ({ children }) => (
          <h5 className="mt-2.5 mb-1 text-sm font-semibold text-gray-900 first:mt-0">
            {children}
          </h5>
        ),
        p: ({ children }) => (
          <p className="my-2 leading-relaxed text-gray-800 first:mt-0 last:mb-0">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-gray-900">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="my-2 list-disc space-y-1 pl-4 marker:text-red-500">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="my-2 list-decimal space-y-1 pl-4 marker:text-red-600">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="pl-0.5 leading-relaxed text-gray-800">{children}</li>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
          >
            {children}
          </a>
        ),
        hr: () => <hr className="my-3 border-gray-200" />,
        blockquote: ({ children }) => (
          <blockquote className="my-2 border-l-2 border-red-300 pl-3 text-gray-600 italic">
            {children}
          </blockquote>
        ),
        code: ({ className, children }) => {
          const isBlock = className?.includes("language-");
          if (isBlock) {
            return (
              <pre className="my-2 overflow-x-auto rounded-lg bg-gray-100 p-2.5 text-xs text-gray-800">
                <code>{children}</code>
              </pre>
            );
          }
          return (
            <code className="rounded bg-gray-100 px-1 py-0.5 text-xs font-medium text-gray-800">
              {children}
            </code>
          );
        },
        table: ({ children }) => (
          <div className="my-2 overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-xs">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-50 text-gray-900">{children}</thead>
        ),
        th: ({ children }) => (
          <th className="border-b border-gray-200 px-2.5 py-1.5 font-semibold">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border-b border-gray-100 px-2.5 py-1.5 text-gray-700">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}



const emptyBookingForm = (): BookingFormData => ({
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  tractor_model: "X45 C2",
  city: "",
  preferred_date: "",
  preferred_time: "",
  notes: "",
});

interface MeetingFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  city: string;
  tractor_model: string;
  topic: string;
  preferred_date: string;
  preferred_time: string;
  language: IndianLanguageCode;
}

interface CallFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  request_type: "sales" | "support";
  /** Language for AI phone call (user picks in form) */
  language: IndianLanguageCode;
  message: string;
  preferred_date: string;
  preferred_time: string;
  schedule_mode: "now" | "scheduled";
}

const emptyMeetingForm = (defaultLang: IndianLanguageCode = "hi"): MeetingFormData => ({
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  city: "",
  tractor_model: "X45 C2",
  topic: "Sales consultation — AutonXT electric tractors",
  preferred_date: "",
  preferred_time: "",
  language: defaultLang,
});

const emptyCallForm = (defaultLang: IndianLanguageCode = "hi"): CallFormData => ({
  customer_name: "",
  customer_email: "",
  customer_phone: "",
  request_type: "support",
  language: defaultLang,
  message: "",
  preferred_date: "",
  preferred_time: "",
  schedule_mode: "now",
});

export default function StaticChatBot() {
  const { lang: siteLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showCallForm, setShowCallForm] = useState(false);
  const [showMeetingForm, setShowMeetingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormData>(emptyBookingForm);
  const [callForm, setCallForm] = useState<CallFormData>(() =>
    emptyCallForm(normalizeIndianLanguageCode(siteLang))
  );
  const [meetingForm, setMeetingForm] = useState<MeetingFormData>(() =>
    emptyMeetingForm(normalizeIndianLanguageCode(siteLang))
  );
  const [userLanguage, setUserLanguage] = useState<IndianLanguageCode>(() =>
    normalizeIndianLanguageCode(siteLang)
  );
  const [callCountdown, setCallCountdown] = useState<number | null>(null);
  const lastUserMessageRef = useRef("");
  const meetingFormRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const callTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callCountdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [messages, setMessages] = useState<Message[]>(() => getWelcomeMessages(t.chat.welcome));

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showCallForm, showBookingForm, showMeetingForm, callCountdown]);

  const pushReportToSales = async (
    trigger: "chat_close" | "call_done" | "booking_done" | "meeting_done",
    extra?: {
      meet_link?: string;
      booking_id?: string;
      call_sid?: string;
      meeting_id?: string;
    }
  ) => {
    try {
      await sendSessionReportToSales({
        session_id: getOrCreateSessionId(),
        customer_name: meetingForm.customer_name || callForm.customer_name || bookingForm.customer_name,
        customer_email: meetingForm.customer_email || callForm.customer_email || bookingForm.customer_email,
        customer_phone: meetingForm.customer_phone || callForm.customer_phone || bookingForm.customer_phone,
        language: userLanguage,
        trigger,
        ...extra,
      });
    } catch (e) {
      console.warn("Session report failed", e);
    }
  };

  useEffect(() => {
    return () => {
      if (callTimeoutRef.current) clearTimeout(callTimeoutRef.current);
      if (callCountdownIntervalRef.current) clearInterval(callCountdownIntervalRef.current);
    };
  }, []);

  const clearCallTimers = () => {
    if (callTimeoutRef.current) {
      clearTimeout(callTimeoutRef.current);
      callTimeoutRef.current = null;
    }
    if (callCountdownIntervalRef.current) {
      clearInterval(callCountdownIntervalRef.current);
      callCountdownIntervalRef.current = null;
    }
    setCallCountdown(null);
  };

  const startCallCountdown = (seconds: number, onComplete: () => void) => {
    clearCallTimers();
    setCallCountdown(seconds);
    callCountdownIntervalRef.current = setInterval(() => {
      setCallCountdown((prev) => {
        if (prev === null || prev <= 1) return null;
        return prev - 1;
      });
    }, 1000);
    callTimeoutRef.current = setTimeout(() => {
      clearCallTimers();
      onComplete();
    }, seconds * 1000);
  };

  const parseN8nReply = (data: N8nChatResponse, fallbackText: string): string => {
    return (
      data.output?.trim() ||
      data.response?.trim() ||
      data.reply?.trim() ||
      data.message?.trim() ||
      data.text?.trim() ||
      fallbackText
    );
  };

  // Send message to n8n Chat Trigger webhook
  const sendToN8N = async (message: string) => {
    try {
      setLoading(true);

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "sendMessage",
          chatInput: message,
          sessionId: getOrCreateSessionId(),
          userLanguage,
          language: userLanguage,
          ...getSessionClock(),
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        let detail = responseText.slice(0, 200);
        try {
          const errJson = JSON.parse(responseText) as { message?: string };
          if (errJson.message) detail = errJson.message;
        } catch {
          /* plain text */
        }
        throw new Error(`Chat service error (${response.status}): ${detail}`);
      }

      let data: N8nChatResponse = {};
      try {
        data = JSON.parse(responseText) as N8nChatResponse;
      } catch {
        return responseText.trim() || "Thank you for your message. Our team will get back to you soon.";
      }

      const reply = parseN8nReply(
        data,
        "I received your message but couldn't generate a reply. Please try again."
      );

      if (aiSuggestsMeeting(reply, lastUserMessageRef.current)) {
        setShowMeetingForm(true);
        setShowCallForm(false);
        setShowBookingForm(false);
        requestAnimationFrame(() =>
          meetingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        );
        return getIntentAssistantReply("meeting", userLanguage, CALL_NOW_DELAY_SECONDS);
      }

      if (aiSuggestsBooking(reply)) {
        setShowBookingForm(true);
        setShowCallForm(false);
        setShowMeetingForm(false);
      }

      return reply;
    } catch (error) {
      console.error("Error sending to n8n:", error);
      const detail =
        error instanceof Error && error.message.includes("Chat service")
          ? error.message.replace(/^Error: /, "")
          : null;
      return detail
        ? `Sorry, chat is temporarily unavailable (${detail}). You can still use **Talk with agent** or **Schedule meeting** below.`
        : "Sorry, I'm having trouble connecting. Use **Talk with agent** or **Schedule meeting** below, or try again in a moment.";
    } finally {
      setLoading(false);
    }
  };

  const applyIntent = (intent: ChatIntent, trimmed: string, lang: IndianLanguageCode) => {
    closeAllForms({
      setShowCallForm,
      setShowMeetingForm,
      setShowBookingForm,
    });

    switch (intent) {
      case "meeting":
        setShowMeetingForm(true);
        setMeetingForm((f) => ({
          ...f,
          language: lang,
          topic: f.topic || trimmed,
        }));
        requestAnimationFrame(() =>
          meetingFormRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
        );
        break;
      case "call_now":
        setShowCallForm(true);
        setCallForm((f) => ({
          ...f,
          language: lang,
          message: f.message || trimmed,
          schedule_mode: "now",
        }));
        break;
      case "call_scheduled":
        setShowCallForm(true);
        setCallForm((f) => ({
          ...f,
          language: lang,
          message: f.message || trimmed,
          schedule_mode: "scheduled",
        }));
        break;
      case "booking":
        setShowBookingForm(true);
        setBookingForm((f) => ({
          ...f,
          notes: f.notes || trimmed,
        }));
        break;
      case "chat":
      default:
        break;
    }

    if (intent !== "chat") {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: getIntentAssistantReply(intent, lang, CALL_NOW_DELAY_SECONDS),
        },
      ]);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const trimmed = userInput.trim();
    const lang = detectLanguageFromText(trimmed);
    setUserLanguage(lang);
    lastUserMessageRef.current = trimmed;

    appendSessionEvent("chat_user", trimmed);

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setUserInput("");

    const intent = detectChatIntent(trimmed);

    if (intent !== "chat") {
      applyIntent(intent, trimmed, lang);
      return;
    }

    // Safety: meeting phrases must open Zoom form, not Gemini field list
    if (isMeetingScheduleRequest(trimmed)) {
      applyIntent("meeting", trimmed, lang);
      return;
    }

    // General questions → n8n Gemini chat (no call/meet/booking forms)
    closeAllForms({
      setShowCallForm,
      setShowMeetingForm,
      setShowBookingForm,
    });

    const aiResponse = await sendToN8N(trimmed);
    appendSessionEvent("chat_assistant", aiResponse);
    setMessages((prev) => [...prev, { role: "assistant", text: aiResponse }]);
  };

  const submitMeetingForm = async () => {
    const f = meetingForm;
    if (!f.customer_name.trim() || !f.customer_email.trim() || !f.customer_phone.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Please enter **name**, **email**, and **phone** for the meeting." },
      ]);
      return;
    }
    if (!f.preferred_date.trim() || !f.preferred_time.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Please pick **date** and **time** for the sales meeting." },
      ]);
      return;
    }

    setUserLanguage(f.language);
    updateSessionProfile({
      name: f.customer_name,
      email: f.customer_email,
      phone: f.customer_phone,
      language: f.language,
    });
    setShowMeetingForm(false);
    setLoading(true);

    try {
      const result = await scheduleSalesMeeting({
        customer_name: f.customer_name.trim(),
        customer_email: f.customer_email.trim(),
        customer_phone: f.customer_phone.trim(),
        city: f.city.trim(),
        tractor_model: f.tractor_model,
        topic: f.topic.trim(),
        preferred_date: f.preferred_date,
        preferred_time: f.preferred_time,
        language: f.language,
        chat_session_id: getOrCreateSessionId(),
      });

      if (!result.success) throw new Error(result.error);

      const zoomUrl = result.zoomLink || result.meetLink;
      const emailNote =
        f.language === "hi"
          ? "\n\n📧 पुष्टि ईमेल **आपको** और **sales@autonxt.in** पर भेज दिया गया है।"
          : "\n\n📧 Confirmation email sent to **you** and **sales@autonxt.in**.";

      const meetLine = zoomUrl
        ? `\n\n**Zoom:** ${zoomUrl}`
        : "\n\nZoom join link is in your email (or coming from sales shortly).";

      const reply =
        (result.message || "Meeting scheduled with AutonXT sales.") +
        emailNote +
        meetLine +
        (result.meetingId ? `\n\n**Reference:** ${result.meetingId}` : "");

      appendSessionEvent("meeting_scheduled", reply, {
        meetingId: result.meetingId,
        meetLink: zoomUrl,
        zoomLink: zoomUrl,
      });

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setMeetingForm(emptyMeetingForm(f.language));
      await pushReportToSales("meeting_done", {
        meet_link: zoomUrl,
        zoom_link: zoomUrl,
        meeting_id: result.meetingId,
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Could not schedule the meeting. Email **sales@autonxt.in** or try again.",
        },
      ]);
      setShowMeetingForm(true);
    } finally {
      setLoading(false);
    }
  };

  const openMeetingForm = () => {
    closeAllForms({ setShowCallForm, setShowMeetingForm, setShowBookingForm });
    setShowMeetingForm(true);
    setMeetingForm((f) => ({ ...f, language: userLanguage }));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          userLanguage === "hi"
            ? "Zoom पर सेल्स टीम से मिलने के लिए फॉर्म भरें।"
            : "Schedule a **Zoom** call with our sales team using the form below.",
      },
    ]);
  };

  const openCallForm = (mode: "now" | "scheduled" = "now") => {
    closeAllForms({ setShowCallForm, setShowMeetingForm, setShowBookingForm });
    setShowCallForm(true);
    setCallForm((f) => ({
      ...f,
      language: userLanguage,
      schedule_mode: mode,
      message: f.message || lastUserMessageRef.current || "Support from website chat",
    }));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: mode === "scheduled" ? getScheduledCallPrompt(userLanguage) : getCallFormPrompt(userLanguage),
      },
    ]);
  };

  const submitCallToN8n = async (payload: {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    request_type: "sales" | "support";
    language: IndianLanguageCode;
    message: string;
    schedule_mode: "now" | "scheduled";
    preferred_date?: string;
    preferred_time?: string;
  }) => {
    const isCallNow = payload.schedule_mode === "now";
    const fullMessage = [
      payload.message,
      isCallNow
        ? "Immediate callback from website chat"
        : `Scheduled callback: ${payload.preferred_date || ""} ${payload.preferred_time || ""}`.trim(),
    ]
      .filter(Boolean)
      .join(" | ");

    return requestPhoneCallback({
      customer_name: payload.customer_name,
      customer_email: payload.customer_email,
      customer_phone: payload.customer_phone,
      request_type: payload.request_type,
      language: payload.language,
      message: fullMessage,
      preferred_date: payload.preferred_date,
      preferred_time: payload.preferred_time,
      schedule_mode: payload.schedule_mode,
      call_delay_seconds: isCallNow ? 0 : undefined,
      chat_session_id: getOrCreateSessionId(),
      source: "autonxt-website-chat",
      voice_gender: "female",
    });
  };

  const submitCallForm = async () => {
    const {
      customer_name,
      customer_email,
      customer_phone,
      request_type,
      language: callLanguage,
      message,
      schedule_mode,
      preferred_date,
      preferred_time,
    } = callForm;

    setUserLanguage(callLanguage);

    if (!customer_name.trim() || !customer_phone.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Please enter **name** and **phone** to receive a call." },
      ]);
      return;
    }

    const phone = normalizePhoneForCallback(customer_phone);
    if (!isValidCallbackPhone(customer_phone)) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Please enter a valid phone with country code (e.g. **+91 9876543210**, **+1 5551234567**).",
        },
      ]);
      return;
    }

    if (schedule_mode === "scheduled" && !preferred_date.trim()) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Please pick a **date** for your scheduled call." },
      ]);
      return;
    }

    setShowCallForm(false);
    appendSessionEvent("call_requested", `Call ${schedule_mode} to ${phone}`, {
      language: callLanguage,
    });
    updateSessionProfile({
      name: customer_name,
      email: customer_email,
      phone,
      language: callLanguage,
    });

    const payload = {
      customer_name: customer_name.trim(),
      customer_email: customer_email.trim() || "chat@autonxt.in",
      customer_phone: phone,
      request_type,
      language: callLanguage,
      message: message || lastUserMessageRef.current || "Support from website chat",
      schedule_mode: schedule_mode as "now" | "scheduled",
      preferred_date: schedule_mode === "scheduled" ? preferred_date : undefined,
      preferred_time: schedule_mode === "scheduled" ? preferred_time : undefined,
    };

    if (schedule_mode === "scheduled") {
      setLoading(true);
      try {
        const result = await submitCallToN8n(payload);
        if (!result.success) throw new Error(result.error || result.message || "Schedule failed");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text:
              result.message ||
              callScheduledMessage(preferred_date, preferred_time, callLanguage),
          },
        ]);
        setCallForm(emptyCallForm(callLanguage));
        appendSessionEvent("call_completed", result.message || "Scheduled call");
        await pushReportToSales("call_done", { call_sid: result.callSid });
      } catch (err) {
        const detail = err instanceof Error ? err.message : "Please try again";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `Could not save your scheduled call. ${detail}\n\nPlease check your number and try again.`,
          },
        ]);
        setShowCallForm(true);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Call now: 10s countdown, then POST to n8n → Twilio outbound in selected language
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text:
          callLanguage === "hi"
            ? `✅ फॉर्म सबमिट। **${CALL_NOW_DELAY_SECONDS} सेकंड** में **${phone}** पर **${languageLabel(callLanguage)}** में कॉल शुरू होगी…`
            : `✅ Form received. Calling **${phone}** in **${languageLabel(callLanguage)}** in **${CALL_NOW_DELAY_SECONDS} seconds**…`,
      },
    ]);

    startCallCountdown(CALL_NOW_DELAY_SECONDS, async () => {
      setLoading(true);
      try {
        const result = await submitCallToN8n(payload);
        if (!result.success) {
          throw new Error(
            result.error ||
              result.message ||
              "Call could not be placed. Please check your phone number and try again."
          );
        }
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: result.message || callQueuedMessage(phone, callLanguage),
          },
        ]);
        setCallForm(emptyCallForm(callLanguage));
        appendSessionEvent("call_completed", result.message || callQueuedMessage(phone, callLanguage), {
          callSid: result.callSid,
        });
        await pushReportToSales("call_done", { call_sid: result.callSid });
      } catch (err) {
        const detail =
          err instanceof Error && err.message
            ? err.message
            : "Network or server error";
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: `Could not start your call. ${detail}\n\nPlease check your number (with country code) and try again.`,
          },
        ]);
        setShowCallForm(true);
      } finally {
        setLoading(false);
      }
    });
  };

  const submitBookingForm = async () => {
    const { customer_name, customer_email, customer_phone, tractor_model, city, preferred_date } =
      bookingForm;

    if (!customer_name.trim() || !customer_email.trim() || !customer_phone.trim() || !city.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Please fill name, email, phone, and city before submitting the booking form.",
        },
      ]);
      return;
    }

    setLoading(true);
    setShowBookingForm(false);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: `Booking request: ${customer_name}, ${tractor_model}, ${city}, ${preferred_date || "flexible date"}`,
      },
    ]);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submitBooking",
          sessionId: getOrCreateSessionId(),
          userLanguage,
          language: userLanguage,
          lastUserMessage: lastUserMessageRef.current,
          ...bookingForm,
        }),
      });

      const responseText = await response.text();
      if (!response.ok) {
        throw new Error(`Booking failed: ${response.status} ${responseText}`);
      }

      let data: N8nChatResponse = {};
      try {
        data = JSON.parse(responseText) as N8nChatResponse;
      } catch {
        data = { output: responseText };
      }

      const reply = parseN8nReply(
        data,
        "Thank you! Your booking was submitted. Our sales team will contact you soon."
      );

      appendSessionEvent("booking_submitted", reply, { bookingId: data.bookingId });
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setBookingForm(emptyBookingForm());
      updateSessionProfile({
        name: customer_name,
        email: customer_email,
        phone: customer_phone,
        language: userLanguage,
      });
      await pushReportToSales("booking_done", { booking_id: data.bookingId });
    } catch (error) {
      console.error("Booking submit error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, we could not save your booking right now. Please try again or email sales@autonxt.in.",
        },
      ]);
      setShowBookingForm(true);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSession = () => {
    const confirmMsg =
      userLanguage === "hi"
        ? "चैट, फॉर्म और सेशन डेटा साफ करें? नई बातचीत शुरू होगी।"
        : "Clear chat, forms, and session data? A new conversation will start.";
    if (!window.confirm(confirmMsg)) return;

    clearCallTimers();
    clearChatSession();
    setLoading(false);
    setUserInput("");
    setShowBookingForm(false);
    setShowCallForm(false);
    setShowMeetingForm(false);
    setBookingForm(emptyBookingForm());
    setCallForm(emptyCallForm(normalizeIndianLanguageCode(siteLang)));
    setMeetingForm(emptyMeetingForm(normalizeIndianLanguageCode(siteLang)));
    setUserLanguage(normalizeIndianLanguageCode(siteLang));
    lastUserMessageRef.current = "";
    setMessages(getWelcomeMessages(t.chat.welcome));
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        onClick={() => {
          if (open) {
            void pushReportToSales("chat_close");
            setOpen(false);
          } else {
            setOpen(true);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-red-600 blur-xl opacity-40 animate-pulse" />

        {/* Ring */}
        <div className="absolute inset-0 rounded-full border border-red-500/30" />

        {/* Logo */}
        <img
          src={logoImg}
          alt="AutoNxt AI"
          className="relative w-11 h-11 rounded-full object-cover border border-white/20"
        />
      </motion.button>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 24,
            }}
            className="fixed bottom-24 right-6 z-50 w-[390px] max-w-[calc(100vw-24px)] h-[650px] rounded-[34px] overflow-hidden bg-white shadow-2xl border border-white/10 flex flex-col"
          >
            {/* HEADER */}
            <div className="relative overflow-hidden bg-black px-5 py-5">

              {/* Background glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.22),transparent_40%)]" />

              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-600 blur-lg opacity-40 animate-pulse" />

                    <img
                      src={logoImg}
                      alt="AutoNxt"
                      className="relative w-12 h-12 rounded-full border border-white/20 object-cover"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-white font-semibold text-lg">
                      AutoNxt AI
                    </h2>

                    <p className="text-white/50 text-xs flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-red-400" />
                      Smart Farming Assistant
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleClearSession}
                    disabled={loading || callCountdown !== null}
                    title={
                      userLanguage === "hi" ? "सेशन साफ करें" : "Clear session"
                    }
                    aria-label={
                      userLanguage === "hi" ? "सेशन साफ करें" : "Clear session"
                    }
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 transition-all disabled:opacity-40"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      void pushReportToSales("chat_close");
                      setOpen(false);
                    }}
                    className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 transition-all"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* CHAT BODY */}
            <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-5 space-y-4">
              {/* Messages */}
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";

                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className={`flex ${
                      isUser
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        isUser
                          ? "bg-red-600 text-white rounded-tr-sm whitespace-pre-line"
                          : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
                      }`}
                    >
                      {isUser ? (
                        msg.text
                      ) : (
                        <ChatMarkdown content={msg.text} />
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {/* Outbound call countdown */}
              {callCountdown !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-red-50 border border-red-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-800 font-medium">
                        Calling in {callCountdown}s…
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Loading indicator */}
              {loading && callCountdown === null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Loader className="w-4 h-4 text-red-600 animate-spin" />
                      <span className="text-sm text-gray-600">Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {showCallForm && (
              <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 space-y-2 max-h-[260px] overflow-y-auto">
                <p className="text-xs font-semibold text-gray-800 uppercase tracking-wide">Phone support</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setCallForm((f) => ({ ...f, schedule_mode: "now" }))} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${callForm.schedule_mode === "now" ? "bg-red-600 text-white" : "border border-gray-200"}`}>{t.bookPage.contactInfo.call}</button>
                  <button type="button" onClick={() => setCallForm((f) => ({ ...f, schedule_mode: "scheduled" }))} className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${callForm.schedule_mode === "scheduled" ? "bg-red-600 text-white" : "border border-gray-200"}`}>{t.bookPage.cta.tag}</button>
                </div>
                <input type="text" placeholder={`${t.bookPage.form.name} *`} value={callForm.customer_name} onChange={(e) => setCallForm((f) => ({ ...f, customer_name: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border text-xs" />
                <input type="tel" placeholder={`${t.bookPage.form.phone} *`} value={callForm.customer_phone} onChange={(e) => setCallForm((f) => ({ ...f, customer_phone: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border text-xs" />
                <input type="email" placeholder={t.bookPage.form.email} value={callForm.customer_email} onChange={(e) => setCallForm((f) => ({ ...f, customer_email: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border text-xs" />
                <select
                  value={callForm.language}
                  onChange={(e) =>
                    setCallForm((f) => ({
                      ...f,
                      language: normalizeIndianLanguageCode(e.target.value),
                    }))
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                  aria-label="Call language"
                >
                  {INDIAN_CALL_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.native} — {l.label}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-500 leading-snug">
                  AI will call you and speak in the language you select above.
                </p>
                <select value={callForm.request_type} onChange={(e) => setCallForm((f) => ({ ...f, request_type: e.target.value as "sales" | "support" }))} className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white">
                  <option value="support">Technical support</option>
                  <option value="sales">Sales / demo</option>
                </select>
                {callForm.schedule_mode === "scheduled" && (
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={callForm.preferred_date} onChange={(e) => setCallForm((f) => ({ ...f, preferred_date: e.target.value }))} className="px-2.5 py-1.5 rounded-lg border text-xs" />
                    <input type="time" value={callForm.preferred_time} onChange={(e) => setCallForm((f) => ({ ...f, preferred_time: e.target.value }))} className="px-2.5 py-1.5 rounded-lg border text-xs" />
                  </div>
                )}
                <textarea placeholder="What do you need help with?" value={callForm.message} onChange={(e) => setCallForm((f) => ({ ...f, message: e.target.value }))} className="w-full px-2.5 py-1.5 rounded-lg border text-xs min-h-[48px]" />
                <div className="flex gap-2">
                  <button type="button" onClick={submitCallForm} disabled={loading || callCountdown !== null} className="flex-1 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold disabled:opacity-50">{callForm.schedule_mode === "now" ? "Submit & call in 10s" : "Schedule call"}</button>
                  <button type="button" onClick={() => setShowCallForm(false)} className="px-3 py-2 rounded-lg border text-xs">{t.common.cancel}</button>
                </div>
              </div>
            )}

            {/* BOOKING FORM */}
            {showMeetingForm && (
              <div
                ref={meetingFormRef}
                className="border-t border-gray-200 bg-blue-50/50 px-4 py-3 space-y-2 max-h-[280px] overflow-y-auto"
              >
                <p className="text-xs font-semibold text-blue-900 uppercase tracking-wide">
                  Schedule meeting — sales team
                </p>
                <input
                  type="text"
                  placeholder={`${t.bookPage.form.name} *`}
                  value={meetingForm.customer_name}
                  onChange={(e) => setMeetingForm((f) => ({ ...f, customer_name: e.target.value }))}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                />
                <input
                  type="email"
                  placeholder={`${t.bookPage.form.email} *`}
                  value={meetingForm.customer_email}
                  onChange={(e) => setMeetingForm((f) => ({ ...f, customer_email: e.target.value }))}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                />
                <input
                  type="tel"
                  placeholder={`${t.bookPage.form.phone} *`}
                  value={meetingForm.customer_phone}
                  onChange={(e) => setMeetingForm((f) => ({ ...f, customer_phone: e.target.value }))}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                />
                <select
                  value={meetingForm.language}
                  onChange={(e) =>
                    setMeetingForm((f) => ({
                      ...f,
                      language: normalizeIndianLanguageCode(e.target.value),
                    }))
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                >
                  {INDIAN_CALL_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      Meeting language: {l.native}
                    </option>
                  ))}
                </select>
                <select
                  value={meetingForm.tractor_model}
                  onChange={(e) => setMeetingForm((f) => ({ ...f, tractor_model: e.target.value }))}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs bg-white"
                >
                  {TRACTOR_MODELS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="City"
                  value={meetingForm.city}
                  onChange={(e) => setMeetingForm((f) => ({ ...f, city: e.target.value }))}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs"
                />
                <p className="text-[10px] text-blue-800">
                  Sales meetings: Mon–Sat 10:00 AM – 5:00 PM IST. If your slot is busy, the next free slot is booked automatically.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={meetingForm.preferred_date}
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setMeetingForm((f) => ({ ...f, preferred_date: e.target.value }))}
                    className="px-2.5 py-1.5 rounded-lg border text-xs"
                  />
                  <input
                    type="time"
                    value={meetingForm.preferred_time}
                    min="10:00"
                    max="16:30"
                    step={1800}
                    onChange={(e) => setMeetingForm((f) => ({ ...f, preferred_time: e.target.value }))}
                    className="px-2.5 py-1.5 rounded-lg border text-xs"
                  />
                </div>
                <textarea
                  placeholder="What would you like to discuss? *"
                  value={meetingForm.topic}
                  onChange={(e) => setMeetingForm((f) => ({ ...f, topic: e.target.value }))}
                  className="w-full px-2.5 py-1.5 rounded-lg border text-xs min-h-[48px]"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={submitMeetingForm}
                    disabled={loading}
                    className="flex-1 py-2 rounded-lg bg-blue-700 text-white text-xs font-semibold disabled:opacity-50"
                  >
                    Schedule meeting
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowMeetingForm(false)}
                    className="px-3 py-2 rounded-lg border text-xs"
                  >
                    {t.common.cancel}
                  </button>
                </div>
              </div>
            )}

            {showBookingForm && (
              <div className="border-t border-red-100 bg-red-50/40 px-4 py-3 space-y-2 max-h-[240px] overflow-y-auto">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                  Book demo / schedule call
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder={`${t.bookPage.form.name} *`}
                    value={bookingForm.customer_name}
                    onChange={(e) =>
                      setBookingForm((f) => ({ ...f, customer_name: e.target.value }))
                    }
                    className="col-span-2 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="email"
                    placeholder={`${t.bookPage.form.email} *`}
                    value={bookingForm.customer_email}
                    onChange={(e) =>
                      setBookingForm((f) => ({ ...f, customer_email: e.target.value }))
                    }
                    className="col-span-2 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={bookingForm.customer_phone}
                    onChange={(e) =>
                      setBookingForm((f) => ({ ...f, customer_phone: e.target.value }))
                    }
                    className="col-span-2 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <select
                    value={bookingForm.tractor_model}
                    onChange={(e) =>
                      setBookingForm((f) => ({ ...f, tractor_model: e.target.value }))
                    }
                    className="col-span-2 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                  >
                    {TRACTOR_MODELS.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="City *"
                    value={bookingForm.city}
                    onChange={(e) => setBookingForm((f) => ({ ...f, city: e.target.value }))}
                    className="col-span-2 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="date"
                    value={bookingForm.preferred_date}
                    onChange={(e) =>
                      setBookingForm((f) => ({ ...f, preferred_date: e.target.value }))
                    }
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="time"
                    value={bookingForm.preferred_time}
                    onChange={(e) =>
                      setBookingForm((f) => ({ ...f, preferred_time: e.target.value }))
                    }
                    className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="text"
                    placeholder={t.bookPage.form.message}
                    value={bookingForm.notes}
                    onChange={(e) => setBookingForm((f) => ({ ...f, notes: e.target.value }))}
                    className="col-span-2 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={submitBookingForm}
                    disabled={loading}
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 disabled:opacity-50"
                  >
                    {t.bookPage.form.submitBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600"
                  >
                    {t.common.cancel}
                  </button>
                </div>
              </div>
            )}

            {/* FOOTER */}
            <div className="border-t border-gray-100 bg-white px-4 py-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => openCallForm("now")} disabled={loading} aria-label="Talk with agent" className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg bg-red-600 text-white text-[9px] font-semibold leading-tight hover:bg-red-700 disabled:opacity-50">
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  Talk with agent
                </button>
                <button type="button" onClick={openMeetingForm} disabled={loading} aria-label="Schedule meeting" className="flex flex-col items-center justify-center gap-0.5 py-2 px-1 rounded-lg bg-blue-700 text-white text-[9px] font-semibold leading-tight hover:bg-blue-800 disabled:opacity-50">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  Schedule meeting
                </button>
              </div>
              {/* Text Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask me anything..."
                  disabled={loading}
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !userInput.trim()}
                  className="w-9 h-9 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>

              {/* Footer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MessageCircle className="w-3 h-3" />

                  AutoNxt AI Assistant
                </div>

                <div className="text-[10px] text-red-500 font-semibold uppercase tracking-widest">
                  Powered by AutoNxt AI
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}