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
} from "lucide-react";

const logoImg = "/small-logo-white.png";
const N8N_WEBHOOK_URL = "https://autonxt.app.n8n.cloud/webhook/1b0b4ec9-24d5-40e0-aced-f9d107f81a86/chat";
const SESSION_STORAGE_KEY = "autonxt-ai-chat-session";

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

const BOOKING_INTENT_PATTERN =
  /book|demo|schedule|call back|callback|test drive|site visit|बुक|डेमो|कॉल|मुलाकात/i;

function suggestsBookingForm(text: string): boolean {
  return BOOKING_INTENT_PATTERN.test(text);
}

function getOrCreateSessionId(): string {
  const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) return existing;

  const id =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `session-${Date.now()}`;
  sessionStorage.setItem(SESSION_STORAGE_KEY, id);
  return id;
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

export default function StaticChatBot() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingForm, setBookingForm] = useState<BookingFormData>(emptyBookingForm);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `👋 Welcome to AutoNxt AI

I'm your intelligent farming assistant built to help you explore the future of electric tractors and smart agriculture.

How can I help you today?`,
    },
  ]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        }),
      });

      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(`n8n webhook error: ${response.status} ${responseText}`);
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

      if (suggestsBookingForm(reply)) {
        setShowBookingForm(true);
      }

      return reply;
    } catch (error) {
      console.error("Error sending to n8n:", error);
      return "Sorry, I'm having trouble connecting. Please try again or contact our team directly.";
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        text: userInput,
      },
    ];

    setMessages(updatedMessages);
    setUserInput("");

    // Send to n8n webhook
    const aiResponse = await sendToN8N(userInput);

    updatedMessages.push({
      role: "assistant",
      text: aiResponse,
    });

    setMessages(updatedMessages);
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

      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      setBookingForm(emptyBookingForm());
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

  const openBookingForm = () => {
    setShowBookingForm(true);
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: "Please fill the booking form below — we will save your details, email our sales team, and send you a confirmation reference.",
      },
    ]);
  };

  return (
    <>
      {/* FLOATING BUTTON */}
      <motion.button
        onClick={() => setOpen(true)}
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

                {/* Close */}
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
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

              {/* Loading indicator */}
              {loading && (
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

            {/* BOOKING FORM */}
            {showBookingForm && (
              <div className="border-t border-red-100 bg-red-50/40 px-4 py-3 space-y-2 max-h-[240px] overflow-y-auto">
                <p className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                  Book demo / schedule call
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Full name *"
                    value={bookingForm.customer_name}
                    onChange={(e) =>
                      setBookingForm((f) => ({ ...f, customer_name: e.target.value }))
                    }
                    className="col-span-2 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
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
                    placeholder="Notes (optional)"
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
                    Submit booking
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* FOOTER */}
            <div className="border-t border-gray-100 bg-white px-4 py-3 space-y-3">
              <button
                type="button"
                onClick={openBookingForm}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 disabled:opacity-50"
              >
                <Calendar className="w-3.5 h-3.5" />
                Book demo / Schedule call
              </button>
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