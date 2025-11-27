import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center p-3 border-t border-gray-800 bg-esblack">
      <input
        className="flex-1 bg-gray-900 text-eswhite p-2 rounded focus:outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="ml-3 p-2 bg-esyellow text-esblack rounded hover:bg-ecorange"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
