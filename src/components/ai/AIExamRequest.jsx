import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";

export default function AIExamRequest() {
  const [topic, setTopic] = useState("");

  return (
    <div className="p-4 bg-esblack rounded border border-gray-800">
      <h3 className="text-esyellow font-bold mb-3">AI Exam Generator</h3>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-2 bg-gray-900 text-eswhite rounded mb-3"
        placeholder="Enter exam topic"
      />

      <PrimaryButton>Generate</PrimaryButton>
    </div>
  );
}
