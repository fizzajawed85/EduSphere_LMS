import React, { useState } from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";

const AIFeePrediction = () => {
  const theme = useSelector(state => state.theme.mode);
  const sidebarWidth = 256;

  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [predictedFee, setPredictedFee] = useState(null);
  const [loading, setLoading] = useState(false);

  const classes = [
    { value: "Class 1", label: "Class 1" },
    { value: "Class 2", label: "Class 2" },
    { value: "Class 3", label: "Class 3" },
  ];

  const handlePredict = () => {
    if (!studentName || !className) return;
    setLoading(true);
    setTimeout(() => {
      // Simulate AI prediction based on class
      const base = className === "Class 1" ? 1000 :
                   className === "Class 2" ? 1500 : 2000;
      const randomOffset = Math.floor(Math.random() * 500); // Add randomness
      setPredictedFee(base + randomOffset);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      <div className="fixed top-0 left-0 h-full w-64 z-40"><Sidebar /></div>

      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        <main className="flex-1 p-6 pt-20 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">AI Fee Prediction</h1>

          <div className={`max-w-md p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack" : "bg-eswhite"}`}>
            <InputField
              label="Student Name"
              value={studentName}
              onChange={e => setStudentName(e.target.value)}
            />
            <SelectField
              label="Class"
              value={className}
              onChange={e => setClassName(e.target.value)}
              options={classes}
            />
            <PrimaryButton onClick={handlePredict} disabled={loading}>
              {loading ? <AiOutlineLoading3Quarters className="animate-spin inline" /> : "Predict Fee"}
            </PrimaryButton>

            {predictedFee && (
              <div className={`mt-4 p-2 rounded shadow-md ${theme === "dark" ? "bg-esdarkblack" : "bg-eswhite"}`}>
                <p className="text-lg font-semibold">
                  Predicted Fee for {studentName} ({className}): ${predictedFee}
                </p>
              </div>
            )}
          </div>
        </main>

        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default AIFeePrediction;
