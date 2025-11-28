// src/pages/students/StudentTransfer.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SelectField from "../../components/forms/SelectField";

import { fetchStudents, addStudent } from "../../redux/slices/studentSlice";

const StudentTransfer = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const { students } = useSelector((state) => state.students);
  const sidebarWidth = 256;

  const [selectedStudent, setSelectedStudent] = useState("");
  const [newClass, setNewClass] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !newClass) return alert("Select student and new class");

    const student = students.find((s) => s.id === selectedStudent);
    if (!student) return alert("Student not found");

    try {
      // Update the class in Firebase via addStudent thunk
      await dispatch(addStudent({ ...student, className: newClass })).unwrap();
      alert("Student transferred successfully");
      setSelectedStudent("");
      setNewClass("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40"><Sidebar /></div>

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-md mx-auto bg-eswhite text-esblack shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Transfer Student</h2>

            <form onSubmit={handleTransfer} className="space-y-4">
              {/* Select Student */}
              <SelectField
                label="Select Student"
                value={selectedStudent}
                onChange={(val) => setSelectedStudent(val)}
                options={students.map((s) => ({ value: s.id, label: `${s.firstName} ${s.lastName}` }))}
              />

              {/* Select New Class */}
              <SelectField
                label="New Class"
                value={newClass}
                onChange={(val) => setNewClass(val)}
                options={[
                  { value: "Nursery", label: "Nursery" },
                  { value: "KG", label: "KG" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                  { value: "8", label: "8" },
                  { value: "9", label: "9" },
                  { value: "10", label: "10" },
                ]}
              />

              <PrimaryButton type="submit">Transfer Student</PrimaryButton>
            </form>
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default StudentTransfer;
