import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);

  const sendMessage = (msg) => {
    const newMsg = { text: msg, sender: "user" };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "I'm thinking...", sender: "bot" },
      ]);
    }, 700);
  };

  return (
    <div className="w-full max-w-lg bg-esblack rounded-lg shadow border border-gray-800 flex flex-col h-[500px]">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-3">
        {messages.map((m, i) => (
          <ChatMessage key={i} text={m.text} sender={m.sender} />
        ))}
      </div>

      <ChatInput onSend={sendMessage} />
    </div>
  );
}
