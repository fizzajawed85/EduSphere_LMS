import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Search } from "lucide-react";
import { fetchStudents } from "../../redux/slices/studentSlice";

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students = [], loading = false } = useSelector((state) => state.students);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="fixed top-0 left-0 z-30 w-full" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          {/* Header: Search + Add */}
          <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 p-4 rounded-lg shadow ${
            theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
          }`}>
            <h2 className="text-2xl font-bold">Students List</h2>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
                />
              </div>

              <PrimaryButton onClick={() => navigate("/students/add")}>Add Student</PrimaryButton>
            </div>
          </div>

          {/* Data Table */}
          <div className={`p-4 rounded-lg shadow-md ${
            theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
          }`}>
            <DataTable
              loading={loading}
              data={filteredStudents}
              columns={[
                { label: "First Name", field: "firstName" },
                { label: "Last Name", field: "lastName" },
                { label: "Roll No", field: "rollNo" },
                { label: "Class", field: "className" },
                { label: "Email", field: "email" },
                { label: "Phone", field: "phone" },
              ]}
            />
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
};

export default StudentList;

