import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers, updateTeacher } from "../../redux/slices/teacherSlice";
import { fetchClasses } from "../../redux/slices/classSlice";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import SelectField from "../../components/forms/SelectField";
import PrimaryButton from "../../components/buttons/PrimaryButton";

export default function TeacherAllocation() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const teachers = useSelector((state) => state.teacher?.teachers || []);
  const classes = useSelector((state) => state.class?.classes || []);

  const [allocation, setAllocation] = useState({
    teacherId: "",
    classId: "",
    subject: "",
  });

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllocation({ ...allocation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allocation.teacherId || !allocation.classId || !allocation.subject) {
      alert("Please fill all fields");
      return;
    }
    dispatch(
      updateTeacher({
        id: allocation.teacherId,
        data: { classAssigned: allocation.classId, subjectAssigned: allocation.subject },
      })
    );
    alert("Teacher allocated successfully!");
    setAllocation({ teacherId: "", classId: "", subject: "" });
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
        {/* Navbar */}
        <div
          className="fixed top-0 left-0 z-30 w-full"
          style={{ marginLeft: sidebarWidth, height: 64 }}
        >
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="max-w-xl mx-auto bg-eswhite text-esblack shadow rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Allocate Teacher</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
              <SelectField
                label="Select Teacher"
                name="teacherId"
                value={allocation.teacherId}
                onChange={handleChange}
                options={teachers.map((t) => ({
                  label: `${t.firstName} ${t.lastName}`,
                  value: t.id,
                }))}
              />
              <SelectField
                label="Select Class"
                name="classId"
                value={allocation.classId}
                onChange={handleChange}
                options={classes.map((c) => ({ label: c.name, value: c.id }))}
              />
              <input
                type="text"
                placeholder="Subject Assigned"
                name="subject"
                value={allocation.subject}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2 dark:bg-esbg dark:border-esborder"
              />
              <PrimaryButton type="submit">Allocate Teacher</PrimaryButton>
            </form>
          </div>
        </main>

        {/* Footer */}
        <Footer
          style={{
            marginLeft: sidebarWidth,
            width: `calc(100% - ${sidebarWidth}px)`,
          }}
        />
      </div>
    </div>
  );
}
