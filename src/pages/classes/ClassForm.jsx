import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import DatePicker from "../../components/forms/DatePicker";
import { classService } from "../../pages/services/classService";
import { teacherService } from "../../pages/services/teacherService";

const ClassForm = ({ onSuccess }) => {
  const theme = useSelector((state) => state.theme.color);

  const [formData, setFormData] = useState({
    name: "",
    section: "",
    totalStudents: "",
    teacherAssigned: "",
    startDate: "",
    endDate: "",
    roomNumber: "",
    timing: "",
    description: "",
  });

  const [teachers, setTeachers] = useState([]);

  // Fetch teachers on mount
  useEffect(() => {
    teacherService.fetchTeachers(setTeachers);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.section) {
      alert("Class Name and Section are required.");
      return;
    }

    try {
      // Add class using classService
      await classService.addClass(formData);

      alert("Class added successfully!");
      setFormData({
        name: "",
        section: "",
        totalStudents: "",
        teacherAssigned: "",
        startDate: "",
        endDate: "",
        roomNumber: "",
        timing: "",
        description: "",
      });

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error adding class:", error);
      alert("Failed to add class. Please try again.");
    }
  };

  return (
    <div className={`p-6 min-h-screen bg-${theme}-100`}>
      <h2 className={`text-3xl font-bold mb-6 text-${theme}-900`}>Add New Class</h2>
      <form
        className="bg-white shadow-md rounded-lg p-6 space-y-4 max-w-2xl"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Class Name" name="name" value={formData.name} onChange={handleChange} required />
          <InputField label="Section" name="section" value={formData.section} onChange={handleChange} required />
          <InputField label="Total Students" type="number" name="totalStudents" value={formData.totalStudents} onChange={handleChange} />
          <SelectField
            label="Teacher Assigned"
            name="teacherAssigned"
            value={formData.teacherAssigned}
            onChange={handleChange}
            options={teachers.map((t) => ({ label: t.name, value: t.id }))}
          />
          <DatePicker label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} />
          <DatePicker label="End Date" name="endDate" value={formData.endDate} onChange={handleChange} />
          <InputField label="Room Number" name="roomNumber" value={formData.roomNumber} onChange={handleChange} />
          <InputField label="Class Timing" name="timing" value={formData.timing} onChange={handleChange} />
        </div>
        <InputField label="Description" name="description" value={formData.description} onChange={handleChange} />
        <PrimaryButton type="submit" label="Add Class" />
      </form>
    </div>
  );
};

export default ClassForm;
