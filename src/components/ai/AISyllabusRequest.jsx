import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";

export default function AISyllabusRequest() {
  const [subject, setSubject] = useState("");

  const generate = () => {
    console.log("Generate syllabus for:", subject);
  };

  return (
    <div className="p-4 bg-esblack rounded border border-gray-800">
      <h3 className="text-esyellow font-bold mb-3">AI Syllabus Generator</h3>

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-2 bg-gray-900 text-eswhite rounded mb-3"
        placeholder="Enter subject"
      />

      <PrimaryButton onClick={generate}>Generate</PrimaryButton>
    </div>
  );
}
