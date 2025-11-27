import React from "react";

export default function ChatMessage({ text, sender }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`p-3 max-w-xs rounded-lg ${
          isUser
            ? "bg-esyellow text-esblack"
            : "bg-gray-800 text-eswhite"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
