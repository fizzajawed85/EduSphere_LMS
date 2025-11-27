import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feeService } from "../../pages/services/feeService";
import { addSubmission } from "../../redux/slices/feeSlice";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import PrimaryButton  from "../../components/buttons/PrimaryButton";

const FeeSubmission = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);

  const [studentName, setStudentName] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = { studentName, amount, paymentMethod, date: new Date().toISOString() };
    const added = await feeService.addSubmission(submissionData);
    dispatch(addSubmission(added));
    setStudentName(""); setAmount(""); setPaymentMethod("");
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Fee Submission</h1>
      <form className="p-4 rounded shadow-md max-w-md" onSubmit={handleSubmit}>
        <InputField label="Student Name" value={studentName} onChange={e => setStudentName(e.target.value)} required />
        <InputField label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        <SelectField 
          label="Payment Method" 
          value={paymentMethod} 
          onChange={e => setPaymentMethod(e.target.value)} 
          options={[
            { value: "Cash", label: "Cash" }, 
            { value: "Card", label: "Card" }, 
            { value: "Online", label: "Online" }
          ]}
          required
        />
        <PrimaryButton type="submit">Submit Payment</PrimaryButton>
      </form>
    </div>
  );
};

export default FeeSubmission;
