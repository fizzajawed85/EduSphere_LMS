import React, { useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";

export default function AIFeePrediction() {
  const [student, setStudent] = useState("");

  return (
    <div className="p-4 bg-esblack rounded border border-gray-800">
      <h3 className="text-esyellow font-bold mb-3">AI Fee Prediction</h3>

      <input
        value={student}
        onChange={(e) => setStudent(e.target.value)}
        className="w-full p-2 bg-gray-900 text-eswhite rounded mb-3"
        placeholder="Enter student ID"
      />

      <PrimaryButton>Predict</PrimaryButton>
    </div>
  );
}
