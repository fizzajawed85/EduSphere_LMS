import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { feeService } from "../../pages/services/feeService";
import { setFees, addFee, updateFee, deleteFee } from "../../redux/slices/feeSlice";
import InputField  from "../../components/forms/InputField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";
import { FaEdit, FaTrash } from "react-icons/fa";

const FeeStructure = () => {
  const dispatch = useDispatch();
  const { feeList } = useSelector((state) => state.fee);
  const theme = useSelector((state) => state.theme.mode);

  const [editing, setEditing] = useState(null);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    feeService.getAllFees().then(data => dispatch(setFees(data)));
  }, []);

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
    <div className={`p-4 min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <h1 className="text-3xl font-bold mb-6">Fee Structure</h1>

      <form className="mb-6 p-4 rounded shadow-md" onSubmit={handleSubmit}>
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
          {feeList.map(fee => (
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
    </div>
  );
};

export default FeeStructure;
