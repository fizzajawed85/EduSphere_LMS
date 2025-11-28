// src/pages/teachers/TeacherList.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTeachers, deleteTeacher } from "../../redux/slices/teacherSlice";
import { subscribeClasses } from "../../redux/slices/classSlice";
import Sidebar from "../../components/bars/Sidebar";
import Navbar from "../../components/bars/Navbar";
import Footer from "../../components/bars/Footer";
import DataTable from "../../components/tables/DataTable";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import IconButton from "../../components/buttons/IconButton";
import { Trash2, Edit, Search } from "lucide-react";

export default function TeacherList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarWidth = 256;
  const theme = useSelector((state) => state.theme.mode);

  const teachers = useSelector((state) => state.teacher?.teachers || []);
  const classes = useSelector((state) => state.class?.classes || []);
  const loading = useSelector((state) => state.teacher?.loading || false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchTeachers());
    dispatch(subscribeClasses()); // get class names for mapping
  }, [dispatch]);

  // Map class ID to name
  const getClassName = (id) => {
    const cls = classes.find((c) => c.id === id);
    return cls ? cls.name : "";
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      dispatch(deleteTeacher(id));
    }
  };

  // Filter teachers
  const filteredTeachers = teachers.filter((t) =>
    `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  // Columns for DataTable
  const columns = [
    { field: "firstName", label: "First Name" },
    { field: "lastName", label: "Last Name" },
    { field: "email", label: "Email" },
    { field: "phone", label: "Phone" },
    { field: "subject", label: "Subject" },
    { field: "classAssigned", label: "Class", render: (_, row) => getClassName(row.classAssigned) },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2">
          <IconButton
            icon={<Edit className="w-4 h-4" />}
            onClick={() => navigate(`/teachers/edit/${row.id}`)}
          />
          <IconButton
            icon={<Trash2 className="w-4 h-4 text-red-500" />}
            onClick={() => handleDelete(row.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={`flex min-h-screen ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
      {/* Sidebar */}
      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth }}>
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full z-30" style={{ marginLeft: sidebarWidth, height: 64 }}>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 pt-20 overflow-auto">
          {/* Header */}
          <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4 p-4 rounded-lg shadow ${theme === "dark" ? "bg-esdarkblack text-white" : "bg-eswhite text-esblack"}`}>
            <h2 className="text-2xl font-bold">Teacher List</h2>

            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-2 py-2 border rounded-md focus:outline-esblue focus:ring-1 focus:ring-esblue"
                />
              </div>
              <PrimaryButton onClick={() => navigate("/teachers/add")}>Add Teacher</PrimaryButton>
            </div>
          </div>

          {/* Table */}
          <div className="p-4 bg-eswhite dark:bg-esdark rounded-lg shadow-md">
            {loading ? (
              <p>Loading teachers...</p>
            ) : (
              <DataTable columns={columns} data={filteredTeachers} />
            )}
          </div>
        </main>

        {/* Footer */}
        <Footer style={{ marginLeft: sidebarWidth, width: `calc(100% - ${sidebarWidth}px)` }} />
      </div>
    </div>
  );
}
