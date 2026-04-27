"use client"

import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput(""); // This makes the text "disappear" from the bar
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-background border-t border-foreground/10">
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex gap-2"
      >
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-xl outline-none border border-foreground/20 bg-foreground/5 text-foreground placeholder:text-foreground/40 focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="Message Agent..."
        />
        <button 
          type="submit"
          disabled={!input.trim()}
          className="bg-foreground text-background px-5 py-2 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-30"
        >
          Send
        </button>
      </form>
    </div>
  );
}
