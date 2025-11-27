import React from "react";
import { MessageCircle } from "lucide-react";

export default function ChatHeader() {
  return (
    <div className="p-3 bg-esblack border-b border-gray-800 flex items-center gap-2">
      <MessageCircle size={20} className="text-esyellow" />
      <h3 className="text-eswhite font-semibold">AI Assistant</h3>
    </div>
  );
}
