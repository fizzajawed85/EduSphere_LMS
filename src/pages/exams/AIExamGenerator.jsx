// src/pages/exam/AIExamGenerator.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AIExamGenerator = () => {
  const theme = useSelector(state => state.theme.mode);
  const sidebarWidth = 256;

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
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">AI Exam Generator</h1>

          <div className={`mb-6 p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <SelectField
              label="Class"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              options={[
                { value: "Class 1", label: "Class 1" },
                { value: "Class 2", label: "Class 2" },
                { value: "Class 3", label: "Class 3" },
              ]}
            />
            <InputField label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <PrimaryButton onClick={handleGenerate} disabled={loading}>
              {loading ? <AiOutlineLoading3Quarters className="animate-spin inline" /> : "Generate Exam"}
            </PrimaryButton>
          </div>

          {questions.length > 0 && (
            <div className={`mt-4 p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
              <h2 className="text-2xl font-semibold mb-2">Generated Questions:</h2>
              <ol className="list-decimal pl-6">
                {questions.map((q) => (
                  <li key={q.id} className="mb-2">{q.question}</li>
                ))}
              </ol>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default AIExamGenerator;
