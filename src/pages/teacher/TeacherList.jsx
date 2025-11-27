import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import { fetchTeachers, deleteTeacher } from "../../redux/slices/teacherSlice";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import PrimaryButton from "../../components/buttons/PrimaryButton"; // 👈 add button
import IconButton from "../../components/buttons/IconButton";
import { Trash2, Edit } from "lucide-react";

export default function TeacherList() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 👈 useNavigate
  const sidebarWidth = 256;

  const { teachers = [], loading = false } = useSelector((state) => state.teacher || {});

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      dispatch(deleteTeacher(id));
    }
  };

  const columns = [
    { key: "firstName", label: "First Name" },
    { key: "lastName", label: "Last Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "classAssigned", label: "Class" },
    { key: "rollNumber", label: "Roll No." },
    { key: "specialization", label: "Specialization" },
    {
      key: "actions",
      label: "Actions",
      render: (teacher) => (
        <div className="flex gap-2">
          <IconButton icon={<Edit className="w-4 h-4" />} onClick={() => alert("Edit functionality")} />
          <IconButton icon={<Trash2 className="w-4 h-4 text-red-500" />} onClick={() => handleDelete(teacher.id)} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen">
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        <main className="flex-1 p-6 pt-20 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Teacher List</h2>
            <PrimaryButton onClick={() => navigate("/teachers/add")}>Add Teacher</PrimaryButton> {/* 👈 Add Teacher Button */}
          </div>

          <div className="p-4 bg-eswhite dark:bg-esdark rounded-lg shadow-md">
            {loading ? (
              <p>Loading teachers...</p>
            ) : (
              <DataTable columns={columns} data={teachers} />
            )}
          </div>
        </main>

        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
}
