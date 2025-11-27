import React, { useState } from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { useSelector } from "react-redux";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AIExamGenerator = () => {
  const theme = useSelector(state => state.theme.mode);
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !className) return;
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const generatedQuestions = [
        { question: `Sample Q1 for ${subject}`, id: 1 },
        { question: `Sample Q2 for ${subject}`, id: 2 },
        { question: `Sample Q3 for ${subject}`, id: 3 },
      ];
      setQuestions(generatedQuestions);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">AI Exam Generator</h1>
      
      <div className="mb-6 p-4 rounded shadow-md">
        <SelectField
          label="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          options={[{ value: "Class 1", label: "Class 1" }, { value: "Class 2", label: "Class 2" }]}
        />
        <InputField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <PrimaryButton onClick={handleGenerate} disabled={loading}>
          {loading ? <AiOutlineLoading3Quarters className="animate-spin inline" /> : "Generate Exam"}
        </PrimaryButton>
      </div>

      {questions.length > 0 && (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Generated Questions:</h2>
          <ol className="list-decimal pl-6">
            {questions.map((q) => (
              <li key={q.id} className="mb-2">{q.question}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default AIExamGenerator;
