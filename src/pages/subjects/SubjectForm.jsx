// src/pages/subjects/SubjectForm.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSubject } from "../../redux/slices/subjectSlice";
import  PrimaryButton  from "../../components/buttons/PrimaryButton";
import { subjectService } from "../../pages/services/subjectService";

const SubjectForm = () => {
  const dispatch = useDispatch();
  const [subjectData, setSubjectData] = useState({
    name: "",
    className: "",
    teacherAssigned: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubjectData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectData.name || !subjectData.className) {
      alert("Please fill required fields");
      return;
    }

    // Dispatch Redux action
    dispatch(addSubject(subjectData));

    // Optional: directly add using service
    // await subjectService.addSubject(subjectData);

    setSubjectData({
      name: "",
      className: "",
      teacherAssigned: "",
      description: "",
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center items-start">
      <form
        className="w-full max-w-lg bg-white shadow-md rounded-lg p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Subject</h2>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Subject Name *</label>
          <input
            type="text"
            name="name"
            value={subjectData.name}
            onChange={handleChange}
            placeholder="Enter subject name"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Class *</label>
          <input
            type="text"
            name="className"
            value={subjectData.className}
            onChange={handleChange}
            placeholder="Enter class for this subject"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Teacher Assigned</label>
          <input
            type="text"
            name="teacherAssigned"
            value={subjectData.teacherAssigned}
            onChange={handleChange}
            placeholder="Enter teacher name (optional)"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={subjectData.description}
            onChange={handleChange}
            placeholder="Optional description"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <PrimaryButton type="submit">Add Subject</PrimaryButton>
      </form>
    </div>
  );
};

export default SubjectForm;
