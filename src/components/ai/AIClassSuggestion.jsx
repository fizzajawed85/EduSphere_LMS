import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";

export default function AIClassSuggestion() {
  const [grade, setGrade] = useState("");

  return (
    <div className="p-4 bg-esblack rounded border border-gray-800">
      <h3 className="text-esyellow font-bold mb-3">AI Class Suggestion</h3>

      <input
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className="w-full p-2 bg-gray-900 text-eswhite rounded mb-3"
        placeholder="Enter grade"
      />

      <PrimaryButton>Suggest</PrimaryButton>
    </div>
  );
}
