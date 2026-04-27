"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInput from "@/src/components/ChatInput";
import { ModeToggle } from "@/src/components/ModeToggle";

export default function Home() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessage = { id: Date.now(), text };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    // Main container spans full height and prevents outer scroll
    <div className="flex flex-col h-screen overflow-hidden bg-background text-foreground">
      {/* --- FIXED HEADER --- */}
      <header className="flex-none z-50 border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="font-bold text-xl tracking-tight">Agent App</h1>
          <ModeToggle />
        </div>
      </header>

      {/* --- SCROLLABLE CONTENT --- */}
      <main
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar relative"
      >
        <div className="max-w-3xl mx-auto p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col"
              >
                <div className="self-end p-3 px-4 rounded-2xl bg-blue-600 text-white max-w-[85%] shadow-sm">
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {messages.length === 0 && (
            <div className="flex items-center justify-center h-[60vh] opacity-20">
              <p className="text-xl font-medium">How can I help you today?</p>
            </div>
          )}
        </div>
      </main>

      {/* --- FIXED INPUT AREA --- */}
      <footer className="flex-none p-4 bg-background border-t border-foreground/10">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSend={handleSendMessage} />
        </div>
      </footer>
    </div>
  );
}
