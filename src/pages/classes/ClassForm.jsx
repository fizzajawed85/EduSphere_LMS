import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import DatePicker from "../../components/forms/DatePicker";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { fetchTeachersService } from "../services/teacherService";
import { addClassThunk } from "../../redux/slices/classSlice";

const ClassForm = () => {
  const dispatch = useDispatch();
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

  // Fetch teachers for dropdown
  useEffect(() => {
    fetchTeachersService().then((data) => setTeachers(data));
  }, []);

  // Generic field change handler
  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.section || !formData.teacherAssigned) {
      alert("Class Name, Section, and Teacher Assigned are required.");
      return;
    }

    try {
      // Dispatch addClassThunk -> updates Firebase + Redux store
      await dispatch(addClassThunk(formData)).unwrap();
      alert("Class added successfully!");

      // Reset form
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
    } catch (error) {
      console.error("Error adding class:", error);
      alert("Failed to add class. Please try again.");
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
      }`}
    >
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <div
          className="fixed top-0 left-0 z-30 w-full"
          style={{ marginLeft: sidebarWidth, height: 64 }}
        >
          <Navbar />
        </div>

        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-4xl mx-auto bg-eswhite dark:bg-esdark text-esblack dark:text-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Add New Class</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Class Name"
                name="name"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                required
              />
              <InputField
                label="Section"
                name="section"
                value={formData.section}
                onChange={(e) => handleFieldChange("section", e.target.value)}
                required
              />
              <InputField
                label="Total Students"
                type="number"
                name="totalStudents"
                value={formData.totalStudents}
                onChange={(e) => handleFieldChange("totalStudents", e.target.value)}
              />

              <SelectField
                label="Teacher Assigned"
                value={formData.teacherAssigned}
                onChange={(val) => handleFieldChange("teacherAssigned", val)}
                options={teachers.map((t) => ({
                  label: `${t.firstName} ${t.lastName}`,
                  value: t.id,
                }))}
                required
              />

              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(date) => handleFieldChange("startDate", date)}
              />
              <DatePicker
                label="End Date"
                value={formData.endDate}
                onChange={(date) => handleFieldChange("endDate", date)}
              />

              <InputField
                label="Room Number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => handleFieldChange("roomNumber", e.target.value)}
              />
              <InputField
                label="Class Timing"
                name="timing"
                value={formData.timing}
                onChange={(e) => handleFieldChange("timing", e.target.value)}
              />

              <div className="col-span-2">
                <InputField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={(e) => handleFieldChange("description", e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <PrimaryButton type="submit">Add Class</PrimaryButton>
              </div>
            </form>
          </div>
        </main>

        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default ClassForm;

