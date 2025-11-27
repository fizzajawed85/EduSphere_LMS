// src/pages/fee/FeeSubmission.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feeService } from "../../pages/services/feeService";
import { addSubmission } from "../../redux/slices/feeSlice";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import PrimaryButton  from "../../components/buttons/PrimaryButton";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";

const FeeSubmission = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [studentName, setStudentName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      studentName,
      amount,
      paymentMethod,
      date: new Date().toISOString(),
    };
    const added = await feeService.addSubmission(submissionData);
    dispatch(addSubmission(added));
    setStudentName("");
    setAmount("");
    setPaymentMethod("");
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Fee Submission</h1>

          <form className={`p-4 rounded-lg shadow-md max-w-md ${theme === "dark" ? "bg-esdarkblack" : "bg-eswhite"}`} onSubmit={handleSubmit}>
            <InputField 
              label="Student Name" 
              value={studentName} 
              onChange={(e) => setStudentName(e.target.value)} 
              required 
            />
            <InputField 
              label="Amount" 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required 
            />
            <SelectField 
              label="Payment Method" 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              options={[
                { value: "Cash", label: "Cash" }, 
                { value: "Card", label: "Card" }, 
                { value: "Online", label: "Online" }
              ]}
              required
            />
            <PrimaryButton type="submit">Submit Payment</PrimaryButton>
          </form>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default FeeSubmission;
