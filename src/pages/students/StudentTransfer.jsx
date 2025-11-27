import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import SelectField from "../../components/forms/SelectField";
import { fetchStudents } from "../../redux/slices/studentSlice"; 
import { studentService } from "../../pages/services/studentService";

const StudentTransfer = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [selectedStudent, setSelectedStudent] = useState("");
  const [newClass, setNewClass] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!selectedStudent || !newClass) return alert("Select student and new class");

    try {
      const studentRef = students.find((s) => s.id === selectedStudent);
      await studentService.addStudent({
        ...studentRef,
        className: newClass,
      });
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
          <div className="max-w-md mx-auto bg-eswhite text-esblack shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Transfer Student</h2>
            <form onSubmit={handleTransfer} className="space-y-4">
              
              <SelectField
                label="Select Student"
                value={selectedStudent}
                onChange={(val) => setSelectedStudent(val)}
                options={students.map((s) => ({ value: s.id, label: `${s.firstName} ${s.lastName}` }))}
              />

              <SelectField
                label="New Class"
                value={newClass}
                onChange={(val) => setNewClass(val)}
                options={[
                  { value: "Class 1", label: "Class 1" },
                  { value: "Class 2", label: "Class 2" },
                  { value: "Class 3", label: "Class 3" },
                  { value: "Class 4", label: "Class 4" },
                ]}
              />

              <PrimaryButton type="submit">
                Transfer Student
              </PrimaryButton>

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
