// src/pages/syllabus/SyllabusForm.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import InputField from "../../components/forms/InputField";
import SelectField from "../../components/forms/SelectField";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { addSyllabus, updateSyllabus } from "../../redux/slices/syllabusSlice";
import { syllabusService } from "../../pages/services/syllabusService";

const SyllabusForm = ({ editData, onClose }) => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [formData, setFormData] = useState({
    title: editData?.title || "",
    className: editData?.className || "",
    subject: editData?.subject || "",
    description: editData?.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editData?.id) {
        const updated = await syllabusService.updateSyllabus(editData.id, formData);
        dispatch(updateSyllabus(updated));
      } else {
        const added = await syllabusService.addSyllabus(formData);
        dispatch(addSyllabus(added));
      }
      onClose?.();
      setFormData({ title: "", className: "", subject: "", description: "" });
    } catch (err) {
      console.error("Error saving syllabus:", err);
      alert("Failed to save syllabus. Check console for details.");
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
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-4xl mx-auto bg-eswhite text-esblack shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">
              {editData ? "Edit Syllabus" : "Add New Syllabus"}
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Title *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <InputField
                label="Class Name *"
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
              />
              <InputField
                label="Subject *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <div className="col-span-2">
                <InputField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  textarea
                />
              </div>

              <div className="col-span-2">
                <PrimaryButton type="submit">
                  {editData ? "Update Syllabus" : "Add Syllabus"}
                </PrimaryButton>
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

export default SyllabusForm;
