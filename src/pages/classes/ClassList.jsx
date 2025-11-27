import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Search } from "lucide-react";
import { fetchClasses } from "../../redux/slices/classSlice";

const ClassList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes = [], loading = false } = useSelector((state) => state.classes);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const filteredClasses = classes.filter((cls) =>
    `${cls.name} ${cls.section}`.toLowerCase().includes(search.toLowerCase())
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
            <h2 className="text-2xl font-bold">Classes List</h2>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
                />
              </div>

              <PrimaryButton onClick={() => navigate("/classes/add")}>Add Class</PrimaryButton>
            </div>
          </div>

          {/* Data Table */}
          <div className={`p-4 rounded-lg shadow-md ${
            theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
          }`}>
            <DataTable
              loading={loading}
              data={filteredClasses}
              columns={[
                { label: "Class Name", field: "name" },
                { label: "Section", field: "section" },
                { label: "Total Students", field: "totalStudents" },
                { label: "Teacher Assigned", field: "teacherAssigned" },
                { label: "Start Date", field: "startDate" },
                { label: "End Date", field: "endDate" },
                { label: "Room", field: "roomNumber" },
                { label: "Timing", field: "timing" },
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

export default ClassList;
