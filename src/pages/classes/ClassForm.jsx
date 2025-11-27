import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import DatePicker from "../../components/forms/DatePicker";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { classService } from "../../pages/services/classService";
import { teacherService } from "../../pages/services/teacherService";

const ClassForm = ({ onSuccess }) => {
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

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
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-4xl mx-auto bg-eswhite text-esblack shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Class</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="col-span-2">
                <InputField label="Description" name="description" value={formData.description} onChange={handleChange} />
              </div>

              <div className="col-span-2">
                <PrimaryButton type="submit">Add Class</PrimaryButton>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default ClassForm;

