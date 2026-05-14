import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User, RotateCcw, ChevronDown } from "lucide-react";
import logoImg from "@assets/adaptive-icon_1777731255752.png";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const WELCOME = "Hi! I'm the AutoNxt AI Assistant. Ask me anything about our electric tractors, specifications, farming use cases, or how to book a demo. How can I help you today?";

const SUGGESTED = [
  "What's the range of the X45H2?",
  "How does it compare to diesel?",
  "Can I book a demo?",
  "Which model suits small farms?",
];

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 h-4">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-current"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <motion.div
      className={`flex gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Avatar */}
      <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm mt-0.5 ${
        isUser ? "bg-accent" : "bg-transparent"
      }`}>
        {isUser ? (
          <User className="w-3.5 h-3.5" />
        ) : (
          <div className="relative w-7 h-7">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary/80 to-red-700 animate-pulse opacity-60 blur-[3px]" />
            <img src={logoImg} alt="AutoNxt AI" className="relative w-7 h-7 rounded-full object-cover border border-primary/40" />
          </div>
        )}
      </div>

      {/* Bubble */}
      <div className={`max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? "bg-accent text-white rounded-tr-sm"
            : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm"
        }`}>
          {msg.streaming && !msg.content ? (
            <TypingDots />
          ) : (
            <span className="whitespace-pre-wrap">{msg.content}{msg.streaming && <TypingDots />}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const getOrCreateConversation = async (): Promise<number> => {
    if (conversationId) return conversationId;
    const res = await fetch("/api/openai/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "AutoNxt Chat" }),
    });
    const conv = await res.json() as { id: number };
    setConversationId(conv.id);
    return conv.id;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggestions(false);

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const streamId = (Date.now() + 1).toString();
    setMessages((prev) => [...prev, { id: streamId, role: "assistant", content: "", streaming: true }]);

    try {
      const convId = await getOrCreateConversation();
      abortRef.current = new AbortController();

      const res = await fetch(`/api/openai/conversations/${convId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
        signal: abortRef.current.signal,
      });

      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const lines = decoder.decode(value).split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const parsed = JSON.parse(line.slice(6)) as { content?: string; done?: boolean };
            if (parsed.content) {
              accumulated += parsed.content;
              setMessages((prev) =>
                prev.map((m) => m.id === streamId ? { ...m, content: accumulated } : m)
              );
            }
            if (parsed.done) {
              setMessages((prev) =>
                prev.map((m) => m.id === streamId ? { ...m, streaming: false } : m)
              );
            }
          } catch { /* ignore parse errors */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamId
              ? { ...m, content: "Sorry, something went wrong. Please try again.", streaming: false }
              : m
          )
        );
      }
    } finally {
      setLoading(false);
      if (!open) setUnread((n) => n + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  };

  const resetChat = () => {
    abortRef.current?.abort();
    setMessages([{ id: "welcome", role: "assistant", content: WELCOME }]);
    setConversationId(null);
    setInput("");
    setLoading(false);
    setShowSuggestions(true);
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
        style={{ padding: 0 }}
        onClick={() => setOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Open AI chat"
      >
        {/* Animated glow rings */}
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-60" style={{ animationDuration: "2.5s" }} />
        <span className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-primary via-red-700 to-primary/60 opacity-70 blur-md" />
        {/* AI circuit ring */}
        <span className="absolute inset-0 rounded-full border-2 border-primary/60" style={{
          background: "conic-gradient(from 0deg, hsl(0,72%,40%,0.6), transparent 60%, hsl(0,72%,40%,0.6))",
          animation: "spin 3s linear infinite",
        }} />
        {/* Logo */}
        <img
          src={logoImg}
          alt="AutoNxt AI"
          className="relative w-11 h-11 rounded-full object-cover border-2 border-white/70 shadow-xl shadow-primary/50 z-10"
        />
        <AnimatePresence mode="wait">
          {unread > 0 && !open ? (
            <motion.span
              key="badge"
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center z-20 border border-white"
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
            >
              {unread}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-white/20"
            style={{ maxHeight: "min(600px, calc(100vh - 160px))" }}
            initial={{ opacity: 0, scale: 0.92, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3.5 flex items-center gap-3 shrink-0">
              <div className="relative w-9 h-9 shrink-0">
                <div className="absolute inset-0 rounded-xl bg-white/30 blur-sm animate-pulse" />
                <div className="absolute inset-[-2px] rounded-xl bg-gradient-to-br from-white/30 via-primary/20 to-red-900/40" />
                <img src={logoImg} alt="AutoNxt" className="relative w-9 h-9 rounded-xl object-cover border border-white/30 shadow-lg" />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-white/80 shadow-sm" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">AutoNxt Assistant</p>
                <p className="text-white/65 text-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  Powered by AI · Always available
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                  title="New conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-8 h-8 rounded-lg hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Close X button top-right overlay */}
            <button
              className="absolute top-1 right-1 text-white/0 hover:text-white/60 p-1 transition-colors"
              onClick={() => setOpen(false)}
              style={{ display: "none" }}
            >
              <X className="w-4 h-4" />
            </button>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 px-4 py-4 space-y-3 scroll-smooth" style={{ minHeight: 0 }}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Suggested questions */}
              <AnimatePresence>
                {showSuggestions && messages.length <= 1 && (
                  <motion.div
                    className="flex flex-col gap-2 pt-1"
                    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }} transition={{ delay: 0.3 }}
                  >
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider px-0.5">Quick questions</p>
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => void sendMessage(q)}
                        className="text-left text-xs px-3 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-primary/40 hover:text-primary hover:bg-primary/4 transition-all duration-150 shadow-xs"
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input area */}
            <div className="bg-white border-t border-gray-100 p-3 shrink-0">
              <div className="flex items-end gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about tractors, specs, pricing…"
                  className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none outline-none min-h-[22px] max-h-24 leading-[1.5] py-0"
                  rows={1}
                  disabled={loading}
                />
                <motion.button
                  onClick={() => void sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="shrink-0 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95 transition-all mb-0.5"
                  whileTap={{ scale: 0.9 }}
                >
                  <Send className="w-3.5 h-3.5" />
                </motion.button>
              </div>
              <p className="text-center text-[10px] text-gray-400 mt-2">
                AutoNxt AI · May make mistakes · Verify important info
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
