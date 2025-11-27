import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feeService } from "../../pages/services/feeService";
import { addVoucher } from "../../redux/slices/feeSlice";
import InputField  from "../../components/forms/InputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const FeeVoucher = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);

  const [studentName, setStudentName] = useState("");
  const [voucherAmount, setVoucherAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const voucherData = { studentName, voucherAmount, date: new Date().toISOString() };
    const added = await feeService.addVoucher(voucherData);
    dispatch(addVoucher(added));
    setStudentName(""); 
    setVoucherAmount("");
  };

  return (
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Fee Voucher</h1>
      <form className="p-4 rounded shadow-md max-w-md" onSubmit={handleSubmit}>
        <InputField label="Student Name" value={studentName} onChange={e => setStudentName(e.target.value)} required />
        <InputField label="Voucher Amount" type="number" value={voucherAmount} onChange={e => setVoucherAmount(e.target.value)} required />
        <PrimaryButton type="submit">Generate Voucher</PrimaryButton>
      </form>
    </div>
  );
};

export default FeeVoucher;
