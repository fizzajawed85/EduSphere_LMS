// src/pages/fee/FeeStructure.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { feeService } from "../../pages/services/feeService";
import { setFees, addFee, updateFee, deleteFee } from "../../redux/slices/feeSlice";
import InputField  from "../../components/forms/InputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";

const FeeStructure = () => {
  const dispatch = useDispatch();
  const feeState = useSelector((state) => state.fee || {});
  const feeList = feeState.feeList || [];
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    feeService.getAllFees().then(data => dispatch(setFees(data)));
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feeData = { title, amount };
    if (editing) {
      const updated = await feeService.updateFee(editing.id, feeData);
      dispatch(updateFee(updated));
      setEditing(null);
    } else {
      const added = await feeService.addFee(feeData);
      dispatch(addFee(added));
    }
    setTitle(""); setAmount("");
  };

  const handleEdit = (fee) => {
    setEditing(fee);
    setTitle(fee.title);
    setAmount(fee.amount);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this fee?")) {
      await feeService.deleteFee(id);
      dispatch(deleteFee(id));
    }
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

        <main className="flex-1 p-6 pt-20 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Fee Structure</h1>

          <form className={`mb-6 p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack" : "bg-eswhite"}`} onSubmit={handleSubmit}>
            <InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <InputField label="Amount" value={amount} type="number" onChange={(e) => setAmount(e.target.value)} required />
            <PrimaryButton type="submit">{editing ? "Update Fee" : "Add Fee"}</PrimaryButton>
          </form>

          <table className="w-full border-collapse shadow-md">
            <thead className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeList.map((fee) => (
                <tr key={fee.id} className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} border-b`}>
                  <td className="p-3">{fee.title}</td>
                  <td className="p-3">{fee.amount}</td>
                  <td className="p-3 flex gap-2">
                    <IconButton onClick={() => handleEdit(fee)}><FaEdit /></IconButton>
                    <IconButton onClick={() => handleDelete(fee.id)}><FaTrash /></IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default FeeStructure;
