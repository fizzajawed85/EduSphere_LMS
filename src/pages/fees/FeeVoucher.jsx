// src/pages/fee/FeeVoucher.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feeService } from "../../pages/services/feeService";
import { addVoucher } from "../../redux/slices/feeSlice";
import InputField from "../../components/forms/InputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";

const FeeVoucher = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme.mode);
  const sidebarWidth = 256;

  const [studentName, setStudentName] = useState("");
  const [voucherAmount, setVoucherAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentName || !voucherAmount) return;

    const voucherData = { studentName, voucherAmount, date: new Date().toISOString() };
    const added = await feeService.addVoucher(voucherData);
    dispatch(addVoucher(added));

    setStudentName(""); setVoucherAmount("");
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      <div className="fixed top-0 left-0 h-full w-64 z-40"><Sidebar /></div>

      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        <main className="flex-1 p-6 pt-20 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Fee Voucher</h1>

          <form className={`p-4 rounded-lg shadow-md max-w-md ${theme === "dark" ? "bg-esdarkblack" : "bg-eswhite"}`} onSubmit={handleSubmit}>
            <InputField label="Student Name" value={studentName} onChange={e => setStudentName(e.target.value)} required />
            <InputField label="Voucher Amount" type="number" value={voucherAmount} onChange={e => setVoucherAmount(e.target.value)} required />
            <PrimaryButton type="submit">Generate Voucher</PrimaryButton>
          </form>
        </main>

        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default FeeVoucher;
