import React, { useState } from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import InputField from "../../components/forms/InputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AIFeePrediction = () => {
  const theme = useSelector(state => state.theme.mode);
  const [studentName, setStudentName] = useState("");
  const [predictedFee, setPredictedFee] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    if (!studentName) return;
    setLoading(true);
    setTimeout(() => {
      setPredictedFee((Math.random() * 1000 + 1000).toFixed(2));
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">AI Fee Prediction</h1>
      <div className="max-w-md p-4 rounded shadow-md">
        <InputField label="Student Name" value={studentName} onChange={e => setStudentName(e.target.value)} />
        <PrimaryButton onClick={handlePredict} disabled={loading}>
          {loading ? <AiOutlineLoading3Quarters className="animate-spin inline" /> : "Predict Fee"}
        </PrimaryButton>
        {predictedFee && (
          <div className="mt-4 p-2 bg-white dark:bg-gray-800 rounded shadow-md">
            <p className="text-lg font-semibold">Predicted Fee: ${predictedFee}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFeePrediction;
