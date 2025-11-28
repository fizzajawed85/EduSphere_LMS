// src/pages/teacher/TeacherAllocation.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachersService, updateTeacherService } from "../services/teacherService";
import { subscribeClasses } from "../../redux/slices/classSlice";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import CustomSelect from "../../components/forms/SelectField";
import PrimaryButton from "../../components/buttons/PrimaryButton";

const TeacherAllocation = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const classes = useSelector((state) => state.class?.classes || []);
  const [teachers, setTeachers] = useState([]);
  const [allocation, setAllocation] = useState({ teacherId: "", classId: "", subject: "" });

  const subjects = ["Math", "Physics", "Chemistry", "Biology", "Computer", "English", "Urdu", "Islamiyat", "History"];

  useEffect(() => {
    // Fetch teachers using promise-based service
    fetchTeachersService().then((data) => setTeachers(data));

    // Fetch classes in real-time
    dispatch(subscribeClasses());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { teacherId, classId, subject } = allocation;

    if (!teacherId || !classId || !subject) {
      alert("Please fill all fields");
      return;
    }

    try {
      await updateTeacherService(teacherId, { classAssigned: classId, subjectAssigned: subject });
      alert("Teacher allocated successfully!");
      setAllocation({ teacherId: "", classId: "", subject: "" });
    } catch (error) {
      console.error("Error allocating teacher:", error);
      alert("Failed to allocate teacher. Try again.");
    }
  };

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      <div className="fixed top-0 left-0 h-full w-64 z-40"><Sidebar /></div>

      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: sidebarWidth, height: 64 }}><Navbar /></div>

        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-xl mx-auto bg-eswhite dark:bg-esdark text-esblack dark:text-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Allocate Teacher</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <CustomSelect
                label="Select Teacher"
                value={allocation.teacherId}
                onChange={(val) => setAllocation({ ...allocation, teacherId: val })}
                options={teachers.map((t) => ({ label: `${t.firstName} ${t.lastName}`, value: t.id }))}
              />

              <CustomSelect
                label="Select Class"
                value={allocation.classId}
                onChange={(val) => setAllocation({ ...allocation, classId: val })}
                options={classes.map((c) => ({ label: c.name, value: c.id }))}
              />

              <CustomSelect
                label="Subject Assigned"
                value={allocation.subject}
                onChange={(val) => setAllocation({ ...allocation, subject: val })}
                options={subjects.map((s) => ({ label: s, value: s }))}
              />

              <PrimaryButton type="submit">Allocate Teacher</PrimaryButton>
            </form>
          </div>
        </main>

        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default TeacherAllocation;
