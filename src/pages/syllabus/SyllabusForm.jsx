// src/pages/syllabus/SyllabusForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSyllabus, updateSyllabus } from "../../redux/slices/syllabusSlice";
import { syllabusService } from "../../pages/services/syllabusService";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";

const SyllabusForm = ({ editData, onClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  const [title, setTitle] = useState(editData?.title || "");
  const [className, setClassName] = useState(editData?.className || "");
  const [description, setDescription] = useState(editData?.description || "");
  const [subject, setSubject] = useState(editData?.subject || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const syllabusData = { title, className, subject, description };

    try {
      if (editData?.id) {
        const updated = await syllabusService.updateSyllabus(editData.id, syllabusData);
        dispatch(updateSyllabus(updated));
      } else {
        const added = await syllabusService.addSyllabus(syllabusData);
        dispatch(addSyllabus(added));
      }
      onClose?.();
    } catch (err) {
      console.error("Error saving syllabus:", err);
    }
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">
        {editData ? "Edit Syllabus" : "Add Syllabus"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <InputField
          label="Class Name"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />

        <InputField
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />

        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          textarea
        />

        <PrimaryButton type="submit">
          {editData ? "Update" : "Add"}
        </PrimaryButton>
      </form>
    </div>
  );
};

export default SyllabusForm;
