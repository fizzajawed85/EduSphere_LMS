// src/pages/fees/FeeStructure.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { feeService } from "../../pages/services/feeService"; 
import { setFees, addFee, updateFee, deleteFee } from "../../redux/slices/feeSlice";
import InputField from "../../components/forms/InputField";
import CustomField from "../../components/forms/SelectField"; 
import PrimaryButton from "../../components/buttons/PrimaryButton";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";

const FeeStructure = () => {
  const dispatch = useDispatch();
  const feeList = useSelector((state) => state.fee?.feeList || []);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const feeTypes = [
    { value: "Tuition", label: "Tuition" },
    { value: "Admission", label: "Admission" },
    { value: "Misc", label: "Miscellaneous" },
  ];

  // Fetch fees from Firebase on mount
  useEffect(() => {
    const fetchFees = async () => {
      try {
        const data = await feeService.getAllFees();
        console.log("Fetched fees from Firebase:", data);
        dispatch(setFees(data));
      } catch (err) {
        console.error("Error fetching fees:", err);
      }
    };
    fetchFees();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !type) return;

    const feeData = { title, amount, type };
    try {
      if (editing) {
        const updated = await feeService.updateFee(editing.id, feeData);
        dispatch(updateFee(updated));
        setEditing(null);
      } else {
        const added = await feeService.addFee(feeData);
        dispatch(addFee(added));
      }
      setTitle(""); 
      setAmount(""); 
      setType("");
    } catch (err) {
      console.error("Error saving fee:", err);
    }
  };

  const handleEdit = (fee) => {
    setEditing(fee);
    setTitle(fee.title);
    setAmount(fee.amount);
    setType(fee.type);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this fee?")) return;
    try {
      await feeService.deleteFee(id);
      dispatch(deleteFee(id));
    } catch (err) {
      console.error("Error deleting fee:", err);
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40"><Sidebar /></div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        <main className="flex-1 p-6 pt-20 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Fee Structure</h1>

          {/* Form */}
          <form
            className={`mb-6 p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-esdarkblack" : "bg-eswhite"}`}
            onSubmit={handleSubmit}
          >
            <InputField label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <InputField label="Amount" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
            <CustomField
              label="Type"
              value={type}
              onChange={setType}
              options={feeTypes}
              placeholder="Select Fee Type"
              required
            />
            <PrimaryButton type="submit" label={editing ? "Update Fee" : "Add Fee"} />
          </form>

          {/* Fee Table */}
          <table className="w-full border-collapse shadow-md">
            <thead className={`${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200"}`}>
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feeList && feeList.length > 0 ? (
                feeList.map(fee => (
                  <tr key={fee.id} className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} border-b`}>
                    <td className="p-3">{fee.title || "-"}</td>
                    <td className="p-3">{fee.amount || "-"}</td>
                    <td className="p-3">{fee.type || "-"}</td>
                    <td className="p-3 flex gap-2">
                      <PrimaryButton type="button" onClick={() => handleEdit(fee)} label="Edit" />
                      <PrimaryButton type="button" onClick={() => handleDelete(fee.id)} label="Delete" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    No fees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </main>

        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default FeeStructure;
