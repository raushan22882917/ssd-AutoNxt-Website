import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronRight,
  X,
  Sparkles,
  Mic,
  Tractor,
  BarChart3,
  Languages,
} from "lucide-react";

import { useLocation } from "wouter";

const logoImg = "/small-logo-white.png";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const QUESTIONS = [
  {
    question:
      "🚜 Which AutoNxt tractor are you interested in?",
    options: ["X45H2", "H55C2", "X25H2"],
  },

  {
    question:
      "🌾 What is your farm size?",
    options: [
      "Small Farm",
      "Medium Farm",
      "Large Farm",
    ],
  },

  {
    question:
      "⚡ What do you need help with?",
    options: [
      "Pricing",
      "Book Demo",
      "Specifications",
      "Financing",
    ],
  },
];

export default function StaticChatBot() {
  const [, navigate] = useLocation();

  const [open, setOpen] = useState(false);

  const [step, setStep] = useState(0);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: `👋 Welcome to AutoNxt AI

I'm your intelligent farming assistant built to help you explore the future of electric tractors and smart agriculture.

✨ I can help you with:
• Tractor specifications
• Battery & range details
• Smart farming solutions
• Pricing & financing
• Booking a demo

🚀 Coming Soon:
Advanced AI Copilot with voice support, multilingual assistance, smart tractor recommendations, and live farm analytics.

How can I help you today?`,
    },
  ]);

  const handleOptionClick = (option: string) => {
    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        text: option,
      },
    ];

    const nextStep = step + 1;

    if (nextStep < QUESTIONS.length) {
      updatedMessages.push({
        role: "assistant",
        text: QUESTIONS[nextStep].question,
      });

      setMessages(updatedMessages);

      setStep(nextStep);
    } else {
      updatedMessages.push({
        role: "assistant",
        text:
          "✅ Perfect! Redirecting you to the booking page so our team can connect with you shortly.",
      });

      setMessages(updatedMessages);

      setTimeout(() => {
        navigate("/book");
      }, 1800);
    }
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
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                        isUser
                          ? "bg-red-600 text-white rounded-tr-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                );
              })}

              {/* COMING SOON CARD */}
              {step === 0 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-red-600" />

                    <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-red-600">
                      Coming Soon
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      {
                        icon: Mic,
                        title: "AI Voice Assistant",
                      },

                      {
                        icon: Tractor,
                        title: "Smart Tractor Recommendation",
                      },

                      {
                        icon: BarChart3,
                        title: "Live Farm Analytics",
                      },

                      {
                        icon: Languages,
                        title: "Regional Language Support",
                      },
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-xl bg-white border border-red-100 flex items-center justify-center">
                          <feature.icon className="w-4 h-4 text-red-600" />
                        </div>

                        <p className="text-sm font-medium text-gray-700">
                          {feature.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* OPTIONS */}
              {step < QUESTIONS.length && (
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className="space-y-2 pt-2"
                >
                  {QUESTIONS[step].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          handleOptionClick(option)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-all text-left group"
                      >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">
                          {option}
                        </span>

                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
                      </button>
                    )
                  )}
                </motion.div>
              )}
            </div>

            {/* FOOTER */}
            <div className="border-t border-gray-100 bg-white px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <MessageCircle className="w-3 h-3" />

                  AutoNxt AI Assistant
                </div>

                <div className="text-[10px] text-red-500 font-semibold uppercase tracking-widest">
                  AI Features Coming Soon
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}