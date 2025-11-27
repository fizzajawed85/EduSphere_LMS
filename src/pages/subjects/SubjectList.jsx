// src/pages/subjects/SubjectList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Search } from "lucide-react";
import { fetchSubjects, deleteSubject } from "../../redux/slices/subjectSlice";

const SubjectList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects = [], loading = false } = useSelector((state) => state.subjects);
  const theme = useSelector((state) => state.theme.mode);
  const sidebarWidth = 256;

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  const filteredSubjects = subjects.filter((subj) =>
    `${subj.name} ${subj.className} ${subj.teacherAssigned}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this subject?")) {
      dispatch(deleteSubject(id));
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
          {/* Header: Search + Add */}
          <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 p-4 rounded-lg shadow ${
            theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
          }`}>
            <h2 className="text-2xl font-bold">Subjects List</h2>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subjects..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
                />
              </div>

              <PrimaryButton onClick={() => navigate("/subjects/add")}>Add Subject</PrimaryButton>
            </div>
          </div>

          {/* Data Table */}
          <div className={`p-4 rounded-lg shadow-md ${
            theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"
          }`}>
            <DataTable
              loading={loading}
              data={filteredSubjects}
              columns={[
                { label: "Name", field: "name" },
                { label: "Class", field: "className" },
                { label: "Teacher Assigned", field: "teacherAssigned" },
                { label: "Description", field: "description" },
                {
                  label: "Actions",
                  field: "actions",
                  render: (subj) => (
                    <div className="flex gap-2">
                      <PrimaryButton size="sm" onClick={() => alert("Edit coming soon")}>Edit</PrimaryButton>
                      <PrimaryButton size="sm" variant="danger" onClick={() => handleDelete(subj.id)}>Delete</PrimaryButton>
                    </div>
                  ),
                },
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

export default SubjectList;
