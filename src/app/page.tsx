"use client"

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
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessage = { id: Date.now(), text };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* --- FIXED HEADER --- */}
      <header className="flex-none border-b border-foreground/10 bg-background/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="font-bold text-xl tracking-tight">Agent App</h1>
          <ModeToggle />
        </div>
      </header>

      {/* --- SCROLLABLE CHAT AREA --- */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-4"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="self-end p-3 px-4 rounded-2xl bg-blue-600 text-white max-w-[85%] shadow-sm"
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 opacity-30">
              <p className="text-lg">How can I help you today?</p>
            </div>
          )}
        </div>
      </main>

      {/* --- FIXED INPUT --- */}
      <div className="flex-none">
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
